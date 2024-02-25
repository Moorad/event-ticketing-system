import { Prisma, prisma } from "database";

export const dynamic = "force-dynamic";

type ReqBodyType = {
	eventId: number;
	userId: number;
	tickets: Record<string, string>[];
};

export async function POST(request: Request) {
	const body = (await request.json()) as ReqBodyType;

	let payload: Prisma.TicketCreateManyInput[] = [];

	for (let i = 0; i < body.tickets.length; i++) {
		payload.push({
			type: Number(body.tickets[i].ticketType),
			associatedName: body.tickets[i].attendeeName,
			locationId: Number(body.tickets[i].location),
			bookedDate: new Date(body.tickets[i].date),
			seatNo: body.tickets[i].seatNo,
			eventId: body.eventId,
			userId: body.userId,
		});
	}

	await prisma.ticket.createMany({
		data: payload,
	});

	return Response.json({
		status: "success",
	});
}
