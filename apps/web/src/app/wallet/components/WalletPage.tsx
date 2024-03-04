"use client";

import CollapsedTicket from "@/app/wallet/components/CollapsedTicket";

import { Event, EventLocation, Ticket, TicketType } from "database";
import FullTicket from "./FullTicket";
import { useEffect, useState } from "react";
import useFetch from "@/utils/hooks/useFetch";
import { SparseTicket } from "../page";

export type DetailedTicket = Ticket & {
	event: Event;
	ticketType: TicketType;
	EventLocation: EventLocation;
};

export default function WalletPage({ tickets }: { tickets: SparseTicket[] }) {
	const [selected, setSelected] = useState<number | null>(null);
	const [ticketData, setTicketData] = useState<DetailedTicket | null>(null);
	const { loading, error, request } = useFetch();

	useEffect(() => {
		if (selected != null) {
			console.log("Change ticket to", selected);

			const getTicket = async () => {
				const res = await request(`/api/tickets/${selected}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (res.ok) {
					console.log(res.body);
					setTicketData(res.body.data);
				}
			};

			getTicket();
		}
	}, [selected]);

	return (
		<div className="flex flex-grow overflow-y-clip">
			<div className="flex flex-wrap gap-5 justify-evenly w-[30vw] overflow-y-auto py-5 border-gray-300 border-r">
				{tickets.map((ticket) => (
					<CollapsedTicket
						onClick={() => {
							setSelected(ticket.id);
						}}
						data={ticket}
						key={ticket.id}
					/>
				))}
			</div>
			<div className="flex-grow flex justify-center py-5 overflow-y-auto">
				{loading ? (
					<div
						className="loader"
						style={{
							borderColor: "#6b728080",
							borderRightColor: "#6b7280",
						}}
					></div>
				) : (
					ticketData && <FullTicket data={ticketData} />
				)}
			</div>
		</div>
	);
}
