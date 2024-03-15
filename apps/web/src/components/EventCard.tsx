import { plainDate } from "@/utils/time";
import Link from "next/link";
import { EventAndCheapestTicket } from "./landing/SearchEvents";

export default function EventCard({
	event,
}: {
	event: EventAndCheapestTicket;
}) {
	return (
		<div className="flex flex-col justify-center w-72 bg-white light-drop-shadow rounded-md">
			<img
				src={event.thumbnail}
				className="rounded-t-md aspect-[10/4] object-cover"
			/>
			<div className="py-2 px-4">
				<div className=" font-semibold">{event.name}</div>
				<div className="text-sm">
					{plainDate(new Date(event.startDate))}
				</div>
				<div className="flex align-middle items-center">
					{event.TicketType.length > 0 && (
						<div className="text-sm ">
							From {event.TicketType[0].cost} SAR
						</div>
					)}
					<Link className="ml-auto" href={"/event/" + event.id}>
						<button className="text-sm bg-brand-red text-white px-4 py-1 rounded hover:cursor-pointer">
							Book
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
