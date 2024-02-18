import CollapsedTicket from "@/components/ticket/CollapsedTicket";
import { prisma } from "database";

export default async function Wallet() {
	const data = await prisma.ticket.findMany({
		where: { userId: 1 },
		include: {
			event: true,
		},
	});

	return (
		<div>
			Wallet page
			<div className="flex flex-wrap gap-5 justify-evenly">
				{data.map((ticket) => (
					<CollapsedTicket data={ticket} key={ticket.id} />
				))}
			</div>
		</div>
	);
}