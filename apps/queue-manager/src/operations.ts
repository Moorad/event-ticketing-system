import { queue, redis } from "./queue-manager";
import {
	EXCHANGE_NAME,
	QUEUE_NAME,
	QUEUE_MIRROR_SET_NAME,
	ACTIVE_USERS_SET_NAME,
	ACTIVE_USER_TTL,
} from "../config.json";

import { verboseLog } from "./index";

export async function enqueue(data: string) {
	const inQueue = await redis.ZSCORE(QUEUE_MIRROR_SET_NAME, data);

	if (inQueue != null) {
		return false;
	}

	queue.publish(EXCHANGE_NAME, "", Buffer.from(data));

	await redis.ZADD(QUEUE_MIRROR_SET_NAME, {
		score: Date.now(),
		value: data,
	});

	verboseLog("Enqueue:", data);

	return true;
}

export async function dequeue() {
	const message = await queue.get(QUEUE_NAME);

	if (message == false) {
		return null;
	}

	await redis.ZREM(QUEUE_MIRROR_SET_NAME, message.content.toString());

	verboseLog("Dequeue:", message.content.toString());

	return message;
}

export async function position(data: string) {
	return await redis.ZRANK(QUEUE_MIRROR_SET_NAME, data);
}

export async function volatileAdd(data: string) {
	const expiryTimestamp = Date.now() + ACTIVE_USER_TTL;

	await redis.ZADD(ACTIVE_USERS_SET_NAME, {
		score: expiryTimestamp,
		value: data,
	});
	verboseLog("ZADD:", data);
}

export default {
	queue: {
		enqueue,
		dequeue,
		position,
	},
	redis: {
		volatileAdd,
	},
};
