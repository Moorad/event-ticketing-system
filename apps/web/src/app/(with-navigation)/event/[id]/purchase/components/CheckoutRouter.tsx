"use client";

import { useState } from "react";
import PurchasePage, { ActiveInformation } from "./PurchasePage";
import { Event, EventLocation, TicketType } from "database";
import { Session } from "next-auth";
import PaymentPage from "./PaymentPage";

type PageType = "purchase" | "payment";
export type ReqBodyType = {
	eventId: number;
	userId: number;
	tickets: Record<string, string>[];
};

export default function CheckoutRouter({
	ticketTypes,
	event,
	info,
	session,
}: {
	ticketTypes: TicketType[];
	event: Event & { EventLocation: EventLocation[] };
	info: ActiveInformation;
	session: Session;
}) {
	const [currentPage, setCurrentPage] = useState<PageType>("purchase");
	const [reqBody, setReqBody] = useState<ReqBodyType | null>(null);

	if (currentPage == "purchase") {
		return (
			<PurchasePage
				event={event}
				ticketTypes={ticketTypes}
				info={info}
				session={session}
				finishPurchase={(body: ReqBodyType) => {
					setReqBody(body);
					setCurrentPage("payment");
				}}
			/>
		);
	}

	if (currentPage == "payment") {
		return <PaymentPage payload={reqBody} ticketTypes={ticketTypes} />;
	}
}
