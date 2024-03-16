import { prisma } from "database";
import type { Event, Ticket, TicketType } from "database";
import WalletPage from "./components/WalletPage";

export type SparseTicket = Pick<Ticket, "id"> & {
	event: Pick<Event, "name">;
	ticketType: Pick<TicketType, "name">;
};

export default async function Wallet() {
	const data = await prisma.ticket.findMany({
		where: { userId: 1 },
		select: {
			id: true,
			event: {
				select: {
					name: true,
				},
			},
			ticketType: {
				select: {
					name: true,
				},
			},
		},
	});

	return <WalletPage tickets={data} />;
}
