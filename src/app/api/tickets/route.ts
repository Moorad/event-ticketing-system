import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	const prisma = new PrismaClient();

	const body = await request.json();

	await prisma.ticket.create({
		data: body,
	});

	return Response.json({
		status: "success",
	});
}
