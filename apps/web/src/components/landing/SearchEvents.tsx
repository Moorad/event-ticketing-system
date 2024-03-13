"use client";

import { Event, TicketType } from "database";
import EventCard from "../EventCard";
import SearchBar from "./SearchBar";
import { useState } from "react";
import useFetch from "@/utils/hooks/useFetch";

export type EventAndCheapestTicket = Event & {
	TicketType: Pick<TicketType, "cost">[];
};

export default function SearchEvents({
	initValue,
}: {
	initValue: EventAndCheapestTicket[];
}) {
	const [events, setEvents] = useState(initValue);
	const { loading, error, request } = useFetch();

	async function handleSearchQuery(query: String) {
		if (query.length < 1) {
			setEvents(initValue);
			return;
		}

		const res = await request(`/api/tickets/search?query=${query}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			setEvents(res.body.events);
		}
	}

	return (
		<>
			<SearchBar handleSearchQuery={handleSearchQuery} />
			<div className="flex flex-wrap gap-2 my-2">
				{loading ? (
					<div className="flex justify-center items-center h-52 w-full">
						<div
							className="loader"
							style={{
								borderColor: "#6b728080",
								borderRightColor: "#6b7280",
							}}
						></div>
					</div>
				) : (
					events.map((event) => (
						<EventCard event={event} key={event.id} />
					))
				)}
			</div>
		</>
	);
}
