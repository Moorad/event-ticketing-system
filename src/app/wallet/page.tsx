import CollapsedTicket from "@/components/ticket/CollapsedTicket";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function Wallet() {
	const prisma = new PrismaClient();
	const data = await prisma.ticket.findMany({
		where: { user_id: 1 },
		include: {
			event: true,
		},
	});

	const session = await getServerSession();

	console.log(session);

	return (
		<div>
			Wallet page
			<div className="flex flex-wrap gap-5 justify-evenly">
				{data.map((ticket) => (
					<CollapsedTicket data={ticket} />
				))}
			</div>
		</div>
	);
}
