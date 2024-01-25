"use client";

import { signIn } from "next-auth/react";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { useState } from "react";

export default function SignUpForm() {
	const [formSubmitted, setFormSubmitted] = useState(false);

	async function register(formData: FormData) {
		setFormSubmitted(true);

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
				callbackUrl: "/",
			});
		} else {
			setFormSubmitted(false);
		}
	}

	return (
		<FormContainer
			title="Sign Up"
			altMethod={{
				name: "Sign In",
				text: "Already have an account?",
				url: "/auth/sign-in",
			}}
			submitFunc={register}
		>
			<FormInput name="full_name" type="text" placeholder="Full name" />
			<FormInput name="email" type="email" placeholder="Email address" />
			<FormInput name="password" type="password" placeholder="Password" />
			<FormButton loading={formSubmitted} text="Register" />
		</FormContainer>
	);
}
