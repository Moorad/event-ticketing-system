import { arrayToBulletPoints, naturalLanguageCombine } from "@/utils/format";
import { z } from "zod";

export async function POST(request: Request) {
	const body = await request.json();

	const validBody = z
		.object({
			eventId: z.number().min(1),
			userId: z.number().min(1),
			tickets: z
				.array(
					z.object({
						attendeeName: z.string().min(3, {
							message:
								"Attendee name must contain at least 3 characters",
						}),
						email: z.string().email({
							message: "Invalid email format",
						}),
						phoneNumber: z
							.string()
							.regex(
								/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
								{
									message: "Invalid phone format",
								}
							),
						ticketType: z.string().regex(/^[0-9]+$/),
						location: z
							.string()
							.regex(/^[0-9]+$/)
							.min(1),
						seatNo: z.string().min(1, {
							message: "Seat number must be at least 1 character",
						}),
						date: z.coerce
							.date({
								errorMap: () => ({
									message: "Invalid date format",
								}),
							})
							.refine((data) => data >= new Date(), {
								message: "Date must be in the future",
							}),
					})
				)
				.min(1, {
					message: "You must add at least one ticket",
				}),
		})
		.safeParse(body);

	// Failed validation
	if (!validBody.success) {
		console.log(validBody.error.issues);
		const errors = new Set(
			validBody.error.issues.map((err) => err.message)
		);
		return Response.json(
			{
				status: "error",
				errors: Array.from(errors),
			},
			{
				status: 403,
			}
		);
	}

	console.log(body);

	return Response.json({
		status: "success",
	});
}
