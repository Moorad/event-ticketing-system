"use client";
import { signIn } from "next-auth/react";

export default function SignInForm() {
	function login(formData: FormData) {
		signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
		});
	}

	return (
		<div>
			<form action={login} className="flex flex-col">
				<div>Sign in</div>
				<input
					name="email"
					type="email"
					className="border-gray-400 border w-32"
				/>
				<input
					name="password"
					type="password"
					className="border-gray-400 border w-32"
				/>
				<button className="w-32">Submit</button>
			</form>
		</div>
	);
}
