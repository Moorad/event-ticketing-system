import * as endpointHandler from "./endpoint-handler";
import * as qm from "./queue-manager";

import { EXPIRY_CHECK_INTERVAL, VERBOSE } from "../config.json";

const port = process.env.QUEUE_MANAGER_PORT || 4000;
const rabbitmqURL = process.env.RABBITMQ_URL || "";
const redisURL = process.env.REDIS_URL || "";

if (!rabbitmqURL) {
	console.error(
		"The environment variable 'RABBITMQ_URL' or 'REDIS_URL' is not set"
	);
	process.exit(1);
}

export function verboseLog(...data: string[]) {
	if (VERBOSE) {
		console.log(...data);
	}
}

async function main() {
	console.log("Queue Manager");

	await qm.initQueue(rabbitmqURL);
	await qm.initRedis(redisURL);

	await qm.drainQueue();

	endpointHandler.listen(port);

	setInterval(qm.removeExpiredEntries, EXPIRY_CHECK_INTERVAL);
}

main();
