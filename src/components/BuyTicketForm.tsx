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
	const [selectedTickets, setSelectedTickets] = useState(
		zerosObject(props.ticketTypes.map((tt) => tt.type))
	);

	const router = useRouter();

	async function submitForm() {
		setFormSubmitted(true);

		const response = await fetch("/api/tickets", {
			method: "POST",
			body: JSON.stringify({
				customer_id: props.customerId,
				event_id: props.eventId,
				selectedTickets: selectedTickets,
			}),
		});

		const body = await response.json();

		if (body.status == "success") {
			router.push("/tickets/success");
		}
	}

	function updateSelectedTicket(
		key: keyof typeof selectedTickets,
		delta: number
	) {
		setSelectedTickets((prevState) => ({
			...prevState,
			[key]: prevState[key] + delta,
		}));
	}

	function computeTotal() {
		return Object.entries(selectedTickets).reduce((acc, [key, value]) => {
			const ticket = props.ticketTypes.find((e) => e.type == key);

			if (ticket) {
				return acc + Number(ticket.cost) * value;
			}

			return acc;
		}, 0);
	}

	return (
		<form>
			<div>
				{props.ticketTypes.map((tt, i) => (
					<TicketCounter
						key={i}
						cost={Number(tt.cost)}
						label={tt.type}
						value={selectedTickets[tt.type]}
						increment={() => updateSelectedTicket(tt.type, 1)}
						decrement={() => updateSelectedTicket(tt.type, -1)}
					/>
				))}
			</div>
			<div>Total: ${numberFormat(computeTotal(), 2)}</div>
			<LoaderButton
				loading={formSubmitted}
				onClick={submitForm}
				text="Buy a ticket"
			/>
		</form>
	);
}
