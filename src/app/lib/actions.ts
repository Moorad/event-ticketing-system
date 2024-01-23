"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	console.log(formData);

	try {
		signIn("credentials", formData);
	} catch (err) {
		if (err instanceof AuthError) {
			switch (err.type) {
				case "CredentialsSignin":
					return "Invalid credentials";
				default:
					return "Internal server error";
			}
		}

		throw err;
	}
}