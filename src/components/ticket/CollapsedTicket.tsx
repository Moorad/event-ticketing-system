import { Event, Ticket } from "@prisma/client";
import Perforation from "./Perforation";

type TicketWithEvent = Ticket & { event: Event };

export default function CollapsedTicket(props: { data: TicketWithEvent }) {
	return (
		<div className="bg-gray-100 w-64 rounded-lg">
			<div className="flex gap-3 py-5 px-3">
				<div className="w-6 h-6 bg-gray-300"></div>
				<div>{props.data.event.name}</div>
				<div className="bg-gray-700 text-white px-2 rounded-full ml-auto">
					{props.data.type}
				</div>
			</div>
			<div>Event: </div>
			<div>User ID: {props.data.userId}</div>
			<Perforation />
			<div className="py-3 px-3 text-center">View ticket</div>
		</div>
	);
}
