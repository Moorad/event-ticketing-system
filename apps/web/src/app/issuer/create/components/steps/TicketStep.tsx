import { useContext, useEffect, useState } from "react";
import FieldRow from "../FieldRow";
import { EventFormContext } from "../../page";
import { updateObjectAt } from "@/utils/transform";

export default function TicketStep() {
	const ctx = useContext(EventFormContext);
	const [currentTicket, setCurrentTicket] = useState(0);

	function handleTicketAdd() {
		ctx.setTickets([
			...ctx.tickets,
			{
				name: "",
				description: "",
				cost: 0,
			},
		]);
	}

	useEffect(() => {
		setCurrentTicket(ctx.tickets.length - 1);
	}, [ctx.tickets]);

	function handleTicketChange(id: number) {
		// Dont change if user clicked on the already selected ticket
		if (currentTicket != id) {
			setCurrentTicket(id);
		}
	}

	return (
		<>
			<div className="mt-2 mb-6 flex gap-3">
				{ctx.tickets.map((t, i) => (
					<div
						key={i}
						className={
							"border rounded-md px-2 py-1 cursor-pointer " +
							(currentTicket == i
								? "border-red-400 bg-red-100"
								: "border-gray-400 hover:bg-gray-100")
						}
						onClick={() => handleTicketChange(i)}
					>
						{i + 1}
					</div>
				))}
				<div
					className="border border-dashed border-gray-300 rounded-md px-2 py-1 cursor-pointer hover:bg-gray-100"
					onClick={handleTicketAdd}
				>
					+
				</div>
			</div>
			<FieldRow
				title="Ticket Name"
				description="Name the type of ticket being offered for your event."
			>
				<input
					type="text"
					className="w-full border px-3 py-2 text-sm"
					placeholder="Ticket name"
					value={ctx.tickets[currentTicket].name}
					onChange={(e) => {
						ctx.setTickets((prev) =>
							updateObjectAt(prev, currentTicket, {
								name: e.target.value,
							})
						);
					}}
				/>
			</FieldRow>
			<hr className="my-3" />
			<FieldRow
				title="Description"
				description="Provide details about the ticket type, such as benefits or restrictions."
			>
				<textarea
					className="w-full border px-3 py-2 text-sm resize-none"
					placeholder="Description"
					value={ctx.tickets[currentTicket].description}
					onChange={(e) => {
						ctx.setTickets((prev) =>
							updateObjectAt(prev, currentTicket, {
								description: e.target.value,
							})
						);
					}}
				/>
			</FieldRow>
			<hr className="my-3" />
			<FieldRow
				title="Price"
				description="Specify the price associated with the ticket."
			>
				<input
					type="number"
					className="w-full border px-3 py-2 text-sm"
					placeholder="Price"
					value={ctx.tickets[currentTicket].cost}
					onChange={(e) => {
						ctx.setTickets((prev) =>
							updateObjectAt(prev, currentTicket, {
								cost: Number(e.target.value),
							})
						);
					}}
				/>
			</FieldRow>
		</>
	);
}
