"use client";

import LoaderButton from "./LoaderButton";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TicketCounter from "./TicketCounter";
import { Prisma } from "@prisma/client";
import { zerosObject } from "@/utils/object";
import { numberFormat } from "@/utils/format";

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
				customer_id: props.customerId,
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
					<div>
						<div>{tt.type}</div>
						<LoaderButton
							loading={formSubmitted}
							onClick={() => {
								console.log(tt.type);
								submitForm(tt.type);
							}}
							text="Buy a ticket"
						/>
					</div>
				))}
			</div>
		</form>
	);
}
