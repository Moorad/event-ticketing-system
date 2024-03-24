import { prisma } from "database";
import { NextRequest } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
	const body = await req.json();

	// Validation
	const validation = z
		.object({
			userId: z.number().min(1, "Invalid user ID"),
			event: z.object({
				name: z
					.string()
					.min(3, "Event name must be at least 3 characters"),
				description: z
					.string()
					.min(3, "Event description must be at least 3 characters"),
				startDate: z.coerce.date({
					errorMap: () => ({
						message: "Invalid start date format",
					}),
				}),
				endDate: z.coerce
					.date({
						errorMap: () => ({
							message: "Invalid start date format",
						}),
					})
					.nullable()
					// End date must be in the future
					.refine((data) => {
						if (data) {
							return data >= new Date();
						}

						return true;
					}, "End date must be in the future"),
				thumbnail: z
					.string()
					.url("You must upload a thumbnail for the event"),
				logo: z.string().url().nullable(),
				location: z
					.string()
					.min(1, "You must provide a location for the event"),
			}),
			tickets: z.array(
				z.object({
					name: z.string().min(1, "You must provide a ticket name"),
					description: z
						.string()
						.min(1, "You must provide a ticket description"),
					cost: z.number().min(1, "Price must be more than 0 SAR"),
				}),
			),
		})
		.safeParse(body);

	// Failed validation
	if (!validation.success) {
		const errors = new Set(
			validation.error.issues.map((err) => err.message),
		);

		return Response.json(
			{
				status: "error",
				message: `Event details and/or ticket details have the following errors: ${Array.from(
					errors,
				).map((err) => "\n• " + err)}`,
			},
			{
				status: 400,
			},
		);
	}

	// Insert
	const event = await prisma.event.create({
		data: {
			userId: validation.data.userId,
			name: validation.data.event.name,
			description: validation.data.event.description,
			startDate: validation.data.event.startDate,
			endDate: validation.data.event.endDate,
			thumbnail: validation.data.event.thumbnail,
			logo: validation.data.event.logo,
			EventLocation: {
				create: {
					name: validation.data.event.location,
				},
			},
			isFeatured: false,
			TicketType: {
				createMany: {
					data: validation.data.tickets,
				},
			},
		},
	});

	return Response.json({
		status: "success",
		eventId: event.id,
	});
}
