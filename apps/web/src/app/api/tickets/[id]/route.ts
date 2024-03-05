export const dynamic = "force-dynamic";

import { prisma } from "database";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const ticket = await prisma.ticket.findUnique({
		where: {
			id: Number(params.id),
		},
		include: {
			event: true,
			ticketType: true,
			EventLocation: true,
		},
	});

	if (ticket == null) {
		return Response.json({
			status: "error",
			message: `Ticket with the id ${params.id} could not be found`,
		});
	}

	return Response.json({
		status: "success",
		data: ticket,
	});
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const ticket = await prisma.ticket.findUnique({
		where: {
			id: Number(params.id)
		}
	});

	if (ticket == null) {
		return Response.json({
			status: "error",
			message: `No ticket exists with ID ${params.id}`
		}, {
			status: 400
		})
	}

	return Response.json({
		status: "success"
	})
}