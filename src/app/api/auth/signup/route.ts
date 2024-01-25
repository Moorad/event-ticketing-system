import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

const saltRounds = 10;

export async function POST(request: Request) {
	const prisma = new PrismaClient();
	const body = await request.json();

	const validBody = z
		.object({
			fullName: z.string().min(3),
			email: z.string().email(),
			password: z.string().min(8),
		})
		.safeParse(body);

	// Failed validation
	if (!validBody.success) {
		return Response.json({
			error: validBody.error,
		});
	}

	const accountExists = await prisma.account.findUnique({
		where: {
			email: validBody.data.email,
		},
	});

	// Account does not exists
	if (accountExists) {
		return Response.json({
			error: "An account with the same email already exists",
		});
	}

	// Create account
	const hashedPassword = await bcrypt.hash(
		validBody.data.password,
		saltRounds
	);

	const user = await prisma.user.create({
		data: {
			full_name: validBody.data.fullName,
		},
	});

	await prisma.account.create({
		data: {
			email: validBody.data.email,
			password: hashedPassword,
			user_id: user.id,
			role: "User",
		},
	});

	return Response.json({
		status: "success",
	});
}
