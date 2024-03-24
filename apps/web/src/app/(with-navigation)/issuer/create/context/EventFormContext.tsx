import { Dispatch, SetStateAction, createContext } from "react";
import { BasicEvent, BasicTicketType } from "../page";

export const EventFormContext = createContext<{
	event: BasicEvent;
	setEvent: Dispatch<SetStateAction<BasicEvent>>;
	tickets: BasicTicketType[];
	setTickets: Dispatch<SetStateAction<BasicTicketType[]>>;
}>({
	event: {
		name: "",
		description: "",
		startDate: new Date(),
		endDate: null,
		logo: null,
		thumbnail: "",
		location: "",
	},
	setEvent: () => {},
	tickets: [],
	setTickets: () => {},
});
