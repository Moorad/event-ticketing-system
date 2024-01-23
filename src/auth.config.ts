import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/auth/sign-in",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			// "!!" converts any falsy value into false e.g. null, undefined, NaN -> false
			const isLoggedIn = !!auth?.user;

			if (isLoggedIn) {
				return true;
			}

			return false;
		},
	},
	providers: [],
} satisfies NextAuthConfig;
