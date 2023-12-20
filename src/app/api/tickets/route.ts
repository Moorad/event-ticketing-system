import { PrismaClient, Ticket } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	const prisma = new PrismaClient();

	const body = await request.json();

	// Ugly transformation
	let payload = Object.entries(body.selectedTickets)
		.filter(([_, value]: any) => {
			return value > 0;
		})
		.map(([key, value]) => ({
			type: key,
			event_id: body.event_id,
			customer_id: body.customer_id,
			count: value,
		})) as Ticket[];

	console.log(payload);

	await prisma.ticket.createMany({
		data: payload,
	});

	return Response.json({
		status: "success",
	});
}
