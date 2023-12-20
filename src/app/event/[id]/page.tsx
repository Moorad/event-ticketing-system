import BuyTicketForm from "@/components/BuyTicketForm";
import { PrismaClient } from "@prisma/client";

export default async function Event({ params }: { params: { id: string } }) {
	const prisma = new PrismaClient();
	const data = await prisma.event.findUnique({
		where: {
			id: Number(params.id),
		},
	});

	if (data == null) {
		return <div>ID not found</div>;
	}

	return (
		<div>
			<div>ID: {data.id}</div>
			<div>Name: {data.name}</div>
			<div>Description: {data.description}</div>

			<BuyTicketForm eventId={data.id} customerId={1} />
		</div>
	);
}
