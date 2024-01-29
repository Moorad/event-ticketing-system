"use client";

import { signIn } from "next-auth/react";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { FormEvent, useEffect, useRef, useState } from "react";
import FormError from "../components/FormError";

export default function SignUpForm() {
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fullNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	async function register(event: FormEvent) {
		event.preventDefault();
		setFormSubmitted(true);
		setError(null);
	}

	useEffect(() => {
		async function sendRegisterReq() {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				body: JSON.stringify({
					fullName: fullNameRef.current?.value,
					email: emailRef.current?.value,
					password: passwordRef.current?.value,
				}),
			});

			const body = await response.json();

			if (body.status == "success") {
				signIn("credentials", {
					email: emailRef.current?.value,
					password: passwordRef.current?.value,
					callbackUrl: "/",
				});
			} else {
				setFormSubmitted(false);
				setError(body.message);
			}
		}

		if (formSubmitted) {
			sendRegisterReq();
		}
	}, [formSubmitted]);

	return (
		<FormContainer
			title="Sign Up"
			altMethod={{
				name: "Sign In",
				text: "Already have an account?",
				url: "/auth/sign-in",
			}}
			onSubmit={register}
		>
			<FormError>{error}</FormError>
			<FormInput
				ref={fullNameRef}
				name="full_name"
				type="text"
				placeholder="Full name"
			/>
			<FormInput
				ref={emailRef}
				name="email"
				type="email"
				placeholder="Email address"
			/>
			<FormInput
				ref={passwordRef}
				name="password"
				type="password"
				placeholder="Password"
			/>
			<FormButton loading={formSubmitted} text="Register" />
		</FormContainer>
	);
}
