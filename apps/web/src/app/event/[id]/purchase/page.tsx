import QueuePage, { QueueInformation } from "./components/QueuePage";
import PurchasePage, { ActiveInformation } from "./components/PurchasePage";

export type Response = QueueInformation | ActiveInformation;

export default async function Event({ params }: { params: { id: string } }) {
	const qmRes = await fetch("http://localhost:4000/queue/check", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			eid: Number(params.id),
			uid: 2,
		}),
		cache: "no-store",
	});

	const queue = (await qmRes.json()) as Response;

	if (queue.status == "waiting") {
		return <QueuePage params={params} info={queue} />;
	}

	return <PurchasePage eventId={params.id} info={queue} />;
}
