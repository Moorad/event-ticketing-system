import QueuePage, { QueueInformation } from "./components/QueuePage";
import { ActiveInformation } from "./components/PurchasePage";
import { prisma } from "database";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import CheckoutRouter from "./components/CheckoutRouter";

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

	const session = await getServerSession(options);

	if (session == null) {
		redirect("/");
	}

	if (queue.status == "waiting") {
		return <QueuePage params={params} info={queue} />;
	}

	const event = await prisma.event.findUnique({
		where: {
			id: Number(params.id),
		},
		include: {
			EventLocation: true,
		},
	});

	if (event == null) {
		return <div>Event not found!</div>;
	}

	const ticketTypes = await prisma.ticketType.findMany({
		where: {
			eventId: Number(params.id),
		},
	});

	return (
		<CheckoutRouter
			ticketTypes={ticketTypes}
			event={event}
			info={queue}
			session={session}
		/>
	);
}
