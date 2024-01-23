import { PrismaClient, Ticket } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	const prisma = new PrismaClient();

	const body = await request.json();

	let payload = {
		type: body.type,
		event_id: body.event_id,
		user_id: body.user_id,
		count: 1,
	};

	await prisma.ticket.create({
		data: payload,
	});

	return Response.json({
		status: "success",
	});
}
