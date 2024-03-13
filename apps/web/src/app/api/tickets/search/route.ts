import { NextRequest } from "next/server";
import { prisma } from "database";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("query");

	if (query == null || query.length < 1) {
		return Response.json({
			status: "error",
			message:
				"You must provide a 'query' parameter with a non-empty value",
		});
	}

	const events = await prisma.event.findMany({
		where: {
			name: {
				contains: query,
				mode: "insensitive",
			},
		},
		include: {
			TicketType: {
				select: {
					cost: true,
				},
				orderBy: {
					cost: "asc",
				},
				take: 1,
			},
		},
	});

	return Response.json({
		status: "success",
		events,
	});
}
