import BuyTicketForm from "@/components/BuyTicketForm";
import { prisma } from "database";

export default async function Event({ params }: { params: { id: string } }) {
	const data = await prisma.event.findUnique({
		where: {
			id: Number(params.id),
		},
	});

	const ticketTypes = await prisma.ticketType.findMany();

	if (data == null || ticketTypes == null) {
		return <div>ID not found</div>;
	}

	return (
		<div>
			<div>ID: {data.id}</div>
			<div>Name: {data.name}</div>
			<div>Description: {data.description}</div>

			<BuyTicketForm
				eventId={data.id}
				customerId={1}
				ticketTypes={ticketTypes}
			/>
		</div>
	);
}
