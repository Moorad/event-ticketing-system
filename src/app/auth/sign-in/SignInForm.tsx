"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import FormContainer from "../components/FormContainer";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { useState } from "react";

export default function SignInForm() {
	const [formSubmitted, setFormSubmitted] = useState(false);

	async function login(formData: FormData) {
		setFormSubmitted(true);

		await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			callbackUrl: "/",
		});
	}

	return (
		<FormContainer
			title="Sign In"
			altMethod={{
				name: "Sign up",
				text: "Don’t have an account?",
				url: "/auth/sign-up",
			}}
			submitFunc={login}
		>
			<FormInput name="email" type="email" placeholder="Email address" />
			<FormInput name="password" type="password" placeholder="Password" />
			<FormButton loading={formSubmitted} text="Login" />
		</FormContainer>
	);
}
