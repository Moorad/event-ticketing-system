import { prisma } from "database";
import { NextRequest } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

export async function GET(
	request: NextRequest,
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
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const json = await request.json();

	const validBody = z
		.object({
			consumerId: z.number().min(1, "Invalid user ID"),
		})
		.safeParse(json);

	if (!validBody.success) {
		return Response.json(
			{
				status: "error",
				message: validBody.error.issues[0],
			},
			{
				status: 400,
			}
		);
	}

	const ticket = await prisma.ticket.findUnique({
		where: {
			id: Number(params.id),
		},
		include: {
			event: true,
		},
	});

	if (ticket == null) {
		return Response.json(
			{
				status: "error",
				message: `No ticket exists with ID ${params.id}`,
			},
			{
				status: 400,
			}
		);
	}

	if (ticket.event.userId != validBody.data.consumerId) {
		return Response.json(
			{
				status: "error",
				message:
					"You cannot delete a ticket for an event you do not own",
			},
			{
				status: 400,
			}
		);
	}

	await prisma.ticket.delete({
		where: {
			id: ticket.id,
		},
	});

	return Response.json({
		status: "success",
	});
}
