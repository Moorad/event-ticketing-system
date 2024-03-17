import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "@/components/primitives/Dropdown";
import Input from "@/components/primitives/Input";
import { faTicket } from "@fortawesome/free-solid-svg-icons/faTicket";
import { Event, EventLocation, TicketType } from "database";
import { RefObject } from "react";

export default function TicketForm({
	formRef,
	ticket,
	event,
}: {
	formRef: RefObject<HTMLFormElement>;
	ticket: TicketType;
	event: (Event & { EventLocation: EventLocation[] }) | null;
}) {
	if (event == null) {
		return <div>Event is null!</div>;
	}

	return (
		<div className="bg-white p-5 rounded light-drop-shadow">
			<div className="text-xl font-bold flex">
				<div className="flex items-center gap-2">
					<div>
						<FontAwesomeIcon icon={faTicket} className="w-6" />
					</div>
					{ticket.name} ticket
				</div>
				<div className="ml-auto">{ticket.cost} SAR</div>
			</div>
			<div className="text-gray-500">{event.name}</div>
			<div className="mt-4 text-gray-500">{ticket.description}</div>
			<hr className="my-4" />
			<form ref={formRef} className="flex flex-wrap gap-4">
				<input name="ticketType" value={ticket.id} type="hidden" />
				<Input
					name="attendeeName"
					label="Attendee name"
					className="w-64"
				/>
				<Dropdown
					label="Location"
					name="location"
					values={event.EventLocation.map((l) => l.id)}
					options={event.EventLocation.map((l) => l.name)}
					className="w-64"
				/>
				<Input
					label="Email"
					name="email"
					type="email"
					className="w-64"
				/>
				<Input
					label="Phone number"
					name="phoneNumber"
					className="w-64"
				/>
				<Input
					label="Date"
					name="date"
					type="datetime-local"
					className="w-64"
				/>
				<Input label="Seat no." name="seatNo" className="w-40" />
			</form>
		</div>
	);
}
