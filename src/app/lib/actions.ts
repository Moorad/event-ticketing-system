"use server";
import { signIn } from "next-auth/react";
// import { AuthError } from "next-auth";

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	// try {
	await signIn("credentials", {
		email: formData.get("email"),
		password: formData.get("password"),
	});

	return "h";
	// } catch (err) {
	// 	if (err instanceof AuthError) {
	// 		switch (err.type) {
	// 			case "CredentialsSignin":
	// 				return "Incorrect username or password.";
	// 			default:
	// 				return "Something went wrong, please try again later.";
	// 		}
	// 	}

	// 	throw err;
	// }
}
