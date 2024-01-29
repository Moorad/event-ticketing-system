"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import FormContainer from "../components/FormContainer";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
	const router = useRouter();
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	function login(event: FormEvent) {
		event.preventDefault();
		setError(null);
		setFormSubmitted(true);
	}

	useEffect(() => {
		if (formSubmitted) {
			signIn("credentials", {
				email: emailRef.current?.value,
				password: passwordRef.current?.value,
				callbackUrl: "/",
				redirect: false,
			}).then((results) => {
				if (results?.ok) {
					router.push("/");
				} else {
					setError("Incorrect email or password.");
					setFormSubmitted(false);
				}
			});
		}
	}, [formSubmitted]);

	return (
		<FormContainer
			title="Sign In"
			altMethod={{
				name: "Sign up",
				text: "Don’t have an account?",
				url: "/auth/sign-up",
			}}
			onSubmit={login}
		>
			<FormError>{error}</FormError>
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
			<FormButton loading={formSubmitted} text="Login" />
		</FormContainer>
	);
}
