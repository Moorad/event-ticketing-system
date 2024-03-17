"use client";
import Modal from "@/components/primitives/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons/faTicket";
import { Dispatch, SetStateAction, createRef, useContext } from "react";
import { TicketsContext } from "../PurchasePage";
import { TicketType } from "database";
export default function TicketTypeModal({
	ticketTypes,
	isVisible,
	setVisibility,
}: {
	ticketTypes: TicketType[];
	isVisible: boolean;
	setVisibility: Dispatch<SetStateAction<boolean>>;
}) {
	const ctx = useContext(TicketsContext);

	function createNewTicketForm(ticketTypeId: number) {
		setVisibility(false);
		ctx.setTicketFormRefs([...ctx.ticketFormRefs, createRef()]);

		const ticketType = ticketTypes.find((t) => t.id == ticketTypeId);

		if (ticketType) {
			ctx.setTickets([...ctx.tickets, ticketType]);
		}
	}

	return (
		<>
			{isVisible && (
				<Modal>
					<div>Choose the ticket type:</div>
					<div className="flex gap-3 mt-4">
						{ticketTypes.map((type) => (
							<div
								key={type.id}
								className="flex flex-col items-center w-20 hover:bg-gray-200 hover:cursor-pointer p-2"
								onClick={() => createNewTicketForm(type.id)}
							>
								<div className="w-8 h-8 bg-red-500 flex justify-center items-center rounded">
									<FontAwesomeIcon
										icon={faTicket}
										className="w-4 text-white"
									/>
								</div>
								<div className="text-sm">
									{type.name} ticket
								</div>
							</div>
						))}
					</div>
				</Modal>
			)}
		</>
	);
}
