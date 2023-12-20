"use client";

import LoaderButton from "./LoaderButton";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyTicketForm(props: {
	eventId: number;
	customerId: number;
}) {
	const [formSubmitted, setFormSubmitted] = useState(false);
	const router = useRouter();

	async function submitForm() {
		setFormSubmitted(true);

		const response = await fetch("/api/tickets", {
			method: "POST",
			body: JSON.stringify({
				customer_id: props.customerId,
				event_id: props.eventId,
				type: "VIP",
			}),
		});

		const body = await response.json();

		if (body.status == "success") {
			router.push("/tickets/success");
		}
	}

	return (
		<form>
			<LoaderButton
				loading={formSubmitted}
				onClick={submitForm}
				text="Buy a ticket"
			/>
		</form>
	);
}
