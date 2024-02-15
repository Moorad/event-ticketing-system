import express, { Request, Response, NextFunction } from "express";
import {
	StorageLocation,
	determineAndStore,
	drainQueue,
	invalidateEntry,
	redis,
} from "./queue-manager";
import bodyParser from "body-parser";
import cors from "cors";
import operations from "./operations";
import { ACTIVE_USERS_SET_NAME } from "../config.json";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Body validation
app.use((req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	if (body.uid == undefined || body.eid == undefined) {
		res.statusCode = 400;
		return res.json({
			error: "Missing 'uid' or 'eid' in body",
		});
	}

	next();
});

app.post("/queue/check", async (req, res) => {
	const entry = `${req.body.eid}:${req.body.uid}`;

	let entryScore = await redis.ZSCORE(ACTIVE_USERS_SET_NAME, entry);

	if (entryScore != null) {
		return res.json({
			status: "active",
			expiresAt: entryScore,
		});
	}

	const storageLocation = await determineAndStore(entry);

	if (storageLocation == StorageLocation.REDIS) {
		entryScore = await redis.ZSCORE(ACTIVE_USERS_SET_NAME, entry);

		return res.json({
			status: "active",
			expiresAt: entryScore,
		});
	}

	const position = await operations.queue.position(entry);

	return res.json({
		status: "waiting",
		position,
	});
});

app.post("/queue/consume", async (req, res) => {
	const entry = `${req.body.eid}:${req.body.uid}`;

	const wasInvalidated = await invalidateEntry(entry);

	if (!wasInvalidated) {
		return res.json({
			consumed: false,
		});
	}

	await drainQueue();

	return res.json({
		consumed: true,
	});
});

export function listen(port: string | number) {
	app.listen(port, () => {
		console.log("- Endpoint handler ready on port " + port);
	});
}
