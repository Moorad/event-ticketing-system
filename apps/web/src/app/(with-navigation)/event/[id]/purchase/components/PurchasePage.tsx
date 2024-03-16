"use client";
import TimerSection from "./purchase/TimerSection";
import TicketFormsSection from "./purchase/TicketFormsSection";
import SummarySection from "./purchase/SummarySection";
import {
	Dispatch,
	RefObject,
	SetStateAction,
	createContext,
	useState,
} from "react";
import { Event, EventLocation, TicketType } from "database";
import TicketTypeModal from "./purchase/TicketTypeModal";
import { Session } from "next-auth";
import useFetch from "@/utils/hooks/useFetch";

export type ActiveInformation = {
	status: "active";
	expiresAt: number;
};

// Context for manging the user-added tickets
export const TicketsContext = createContext<{
	tickets: TicketType[];
	setTickets: Dispatch<SetStateAction<TicketType[]>>;
	ticketFormRefs: RefObject<HTMLFormElement>[];
	setTicketFormRefs: Dispatch<SetStateAction<RefObject<HTMLFormElement>[]>>;
	event: (Event & { EventLocation: EventLocation[] }) | null;
}>({
	tickets: [],
	setTickets: (t) => {},
	ticketFormRefs: [],
	setTicketFormRefs: (r) => {},
	event: null,
});

export default function PurchasePage({
	ticketTypes,
	event,
	info,
	session,
	finishPurchase,
}: {
	ticketTypes: TicketType[];
	event: Event & { EventLocation: EventLocation[] };
	info: ActiveInformation;
	session: Session;
	finishPurchase: Function;
}) {
	const [tickets, setTickets] = useState<TicketType[]>([]);
	const [ticketFormRefs, setTicketFormRef] = useState<
		RefObject<HTMLFormElement>[]
	>([]);
	const [isModalVisible, setModalVisiblity] = useState(false);
	const { loading, error, request } = useFetch();

	async function handleCheckout() {
		// Ugly
		const allFormData = [];
		for (let i = 0; i < ticketFormRefs.length; i++) {
			const currentRef = ticketFormRefs[i];
			if (currentRef.current) {
				const formData = Array.from(currentRef.current.elements).reduce(
					(acc, element) => {
						const name = element.getAttribute("name");
						if (name != null) {
							acc[name] = (element as HTMLInputElement).value;
						}
						return acc;
					},
					{} as Record<string, string>
				);
				allFormData.push(formData);
			}
		}

		const reqBody = {
			eventId: event.id,
			userId: session.user.id,
			tickets: allFormData,
		};

		const res = await request("/api/tickets/validate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reqBody),
		});

		if (res.ok) {
			finishPurchase(reqBody);
		}
	}

	return (
		<TicketsContext.Provider
			value={{
				tickets: tickets,
				setTickets: setTickets,
				ticketFormRefs: ticketFormRefs,
				setTicketFormRefs: setTicketFormRef,
				event: event,
			}}
		>
			<div className="flex-grow flex max-md:flex-col justify-center gap-1 overflow-y-clip">
				<TicketTypeModal
					ticketTypes={ticketTypes}
					isVisible={isModalVisible}
					setVisibility={setModalVisiblity}
				/>
				<TimerSection endTime={info.expiresAt} />

				<TicketFormsSection
					addTicketHandler={() => setModalVisiblity(true)}
					error={error}
				/>
				<SummarySection
					submitting={loading}
					checkoutHandler={handleCheckout}
				/>
			</div>
		</TicketsContext.Provider>
	);
}
