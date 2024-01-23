"use client";
import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function signIn() {
	const [errMsg, dispatch] = useFormState(authenticate, undefined);

	return (
		<form action={dispatch} className="flex flex-col">
			<div>Sign in</div>
			{errMsg}
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
	);
}
