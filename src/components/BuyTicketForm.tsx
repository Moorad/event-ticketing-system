"use client";

import LoadingButton from "./LoadingButton";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

export default function BuyTicketForm(props: {
	eventId: number;
	customerId: number;
	ticketTypes: Prisma.TicketTypeCreateManyInput[];
}) {
	const [formSubmitted, setFormSubmitted] = useState(false);
	const router = useRouter();

	async function submitForm(ticketType: string) {
		setFormSubmitted(true);

		const response = await fetch("/api/tickets", {
			method: "POST",
			body: JSON.stringify({
				user_id: props.customerId,
				event_id: props.eventId,
				type: ticketType,
			}),
		});

		const body = await response.json();

		if (body.status == "success") {
			router.push("/tickets/success");
		}
	}

	return (
		<form>
			<div>
				{props.ticketTypes.map((tt, i) => (
					<div key={i}>
						<div>{tt.type}</div>
						<LoadingButton
							loading={formSubmitted}
							onClick={() => {
								console.log(tt.type);
								submitForm(tt.type);
							}}
							className="bg-gray-300 px-2 py-1 rounded disabled:bg-gray-100"
						>
							Buy a ticket
						</LoadingButton>
					</div>
				))}
			</div>
		</form>
	);
}
