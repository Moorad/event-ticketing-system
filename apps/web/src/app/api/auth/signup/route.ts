import { naturalLanguageCombine } from "@/utils/format";
import { prisma } from "database";
import bcrypt from "bcrypt";
import { z } from "zod";
import { NextRequest } from "next/server";

const saltRounds = 10;

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	const body = await request.json();

	const validBody = z
		.object({
			fullName: z.string().min(3, {
				message: "full name must contain at least 3 characters",
			}),
			email: z.string().email({
				message: "invalid email format",
			}),
			password: z.string().min(8, {
				message: "password must contain at least 8 characters",
			}),
		})
		.safeParse(body);

	// Failed validation
	if (!validBody.success) {
		const errors = naturalLanguageCombine(
			validBody.error.issues.map((err) => err.message)
		);
		return Response.json(
			{
				status: "error",
				message: errors,
			},
			{
				status: 403,
			}
		);
	}

	const accountExists = await prisma.account.findUnique({
		where: {
			email: validBody.data.email,
		},
	});

	// Account does not exists
	if (accountExists) {
		return Response.json(
			{
				status: "error",
				message: "An account with the same email already exists",
			},
			{
				status: 403,
			}
		);
	}

	// Create account
	const hashedPassword = await bcrypt.hash(
		validBody.data.password,
		saltRounds
	);

	const user = await prisma.user.create({
		data: {
			fullName: validBody.data.fullName,
			role: {
				connect: {
					id: 1, // Default role: Consumer
				},
			},
		},
	});

	await prisma.account.create({
		data: {
			email: validBody.data.email,
			password: hashedPassword,
			userId: user.id,
		},
	});

	return Response.json({
		status: "success",
	});
}
