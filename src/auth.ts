import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				// validation
				const validCredentials = z
					.object({
						email: z.string().email(),
						password: z.string().min(8),
					})
					.safeParse(credentials);

				if (!validCredentials.success) {
					return null;
				}

				const { email, password } = validCredentials.data;

				const account = await prisma.account.findUnique({
					where: {
						email: email,
					},
				});

				// Account not found
				if (account == null) {
					return null;
				}

				const passwordsMatch = await bcrypt.compare(
					password,
					account.password
				);

				// Passwords do not match
				if (!passwordsMatch) {
					return null;
				}

				return account;
			},
		}),
	],
});
