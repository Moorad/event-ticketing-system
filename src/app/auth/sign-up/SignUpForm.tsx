"use client";

import { signIn } from "next-auth/react";

export default function SignUpForm() {
	async function register(formData: FormData) {
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			body: JSON.stringify({
				fullName: formData.get("full_name"),
				email: formData.get("email"),
				password: formData.get("password"),
			}),
		});

		const body = await response.json();

		if (body.status && body.status == "success") {
			signIn("credentials", {
				email: formData.get("email"),
				password: formData.get("password"),
			});
		}

		console.log(body);
	}

	return (
		<div>
			<form action={register} className="flex flex-col">
				<div>Sign Up</div>
				<input
					name="full_name"
					type="text"
					className="border-gray-400 border w-32"
				/>
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
