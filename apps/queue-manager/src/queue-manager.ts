import amqp from "amqplib";
import { createClient } from "redis";
import type { RedisClientType } from "redis";
import operations from "./operations";
import { verboseLog } from "./index";
import {
	QUEUE_NAME,
	EXCHANGE_NAME,
	ACTIVE_USERS_SET_NAME,
	MAX_ACTIVE_USERS,
} from "../config.json";

export enum StorageLocation {
	REDIS = "REDIS",
	QUEUE = "QUEUE",
}

export let queue: amqp.Channel;
export let redis: RedisClientType;

export async function initQueue(rabbitmqURL: string) {
	const connection = await amqp.connect(rabbitmqURL, {});
	queue = await connection.createChannel();

	// When Ctrl + C close connection and channel
	process.once("SIGINT", async () => {
		await connection.close();
		await queue.close();
	});

	await queue.assertQueue(QUEUE_NAME, { durable: false });
	await queue.assertExchange(EXCHANGE_NAME, "fanout");
	await queue.bindQueue(QUEUE_NAME, EXCHANGE_NAME, "");

	console.log("- Queue is ready, listening to queue '" + QUEUE_NAME + "'");
}

export async function initRedis(redisURL: string) {
	const client = createClient({
		url: redisURL,
	}) as RedisClientType;

	client.on("error", (err) => console.log("Redis Client Error", err));

	// When Ctrl + C close client
	process.once("SIGINT", async () => {
		await client.disconnect();
	});

	await client.connect();

	console.log("- Redis is ready");

	redis = client;
}

export async function drainQueue() {
	let redisCapacity = await redis.ZCARD(ACTIVE_USERS_SET_NAME);
	let remainingSpace = MAX_ACTIVE_USERS - redisCapacity;

	if (remainingSpace > 0) {
		for (let i = 0; i < remainingSpace; i++) {
			const message = await operations.queue.dequeue();

			if (!message) {
				return;
			}

			await operations.redis.volatileAdd(message.content.toString());

			queue.ack(message);
		}
	}
}

export async function determineAndStore(
	data: string
): Promise<StorageLocation> {
	const redisCapacity = await redis.ZCARD(ACTIVE_USERS_SET_NAME);

	if (redisCapacity < MAX_ACTIVE_USERS) {
		await operations.redis.volatileAdd(data);

		return StorageLocation.REDIS;
	}

	await operations.queue.enqueue(data);

	return StorageLocation.QUEUE;
}

export async function invalidateEntry(data: string) {
	const score = await redis.ZSCORE(ACTIVE_USERS_SET_NAME, data);

	if (score != null) {
		await redis.ZREM(ACTIVE_USERS_SET_NAME, data);
		verboseLog("ZREM:", data);
		return true;
	}

	return false;
}

export async function removeExpiredEntries() {
	const expiredCount = await redis.zRemRangeByScore(
		ACTIVE_USERS_SET_NAME,
		"-inf",
		Date.now()
	);

	if (expiredCount > 0) {
		verboseLog(`Removed ${expiredCount} expired entries.`);
		await drainQueue();
	}
}
