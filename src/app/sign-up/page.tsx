"use client";

import { getSession } from "next-auth/react";

export default async function signUp() {
	const session = await getSession();

	console.log(session);
	return <div>Authenticating</div>;
}
