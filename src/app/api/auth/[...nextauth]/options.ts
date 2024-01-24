import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: {
					label: "Email address",
					type: "text",
					placeholder: "example@mail.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				console.log("start");
				const prisma = new PrismaClient();
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

				console.log("valid cred");

				const { email, password } = validCredentials.data;

				const account = await prisma.account.findUnique({
					where: {
						email: email,
					},
				});

				console.log("account found");

				// Account not found
				if (account == null) {
					return null;
				}

				const pw = await bcrypt.hash(password, saltRounds);
				console.log(pw);

				const passwordsMatch = await bcrypt.compare(
					password,
					account.password
				);

				console.log("password match");

				// Passwords do not match
				if (!passwordsMatch) {
					return null;
				}

				return account;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			console.log("--- session ---");
			console.log(session);
			console.log(token);

			if (session?.user) {
				session.user.id = token.sub;
			}

			return session;
		},
		async jwt({ token, account, user }) {
			console.log("--- jwt ---");
			console.log(token);
			console.log(account);
			console.log(user);

			if (user) {
				token.id = account?.userId;
			}

			return token;
		},
	},
};
