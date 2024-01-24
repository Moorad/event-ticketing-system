import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
	pages: {
		signIn: "/auth/sign-in",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: {
					label: "Email address",
					type: "text",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const prisma = new PrismaClient();
				const validCredentials = z
					.object({
						email: z.string().email().toLowerCase(),
						password: z.string().min(8),
					})
					.safeParse(credentials);

				// Failed validation
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
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = String(token.id);
			}

			return session;
		},
	},
};