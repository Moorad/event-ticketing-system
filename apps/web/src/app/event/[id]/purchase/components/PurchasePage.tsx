import { prisma } from "database";
import CountdownTimer from "./CountdownTimer";

export type ActiveInformation = {
	status: "active";
	expiresAt: number;
};

export default async function PurchasePage({
	eventId,
	info,
}: {
	eventId: string;
	info: ActiveInformation;
}) {
	const data = await prisma.event.findUnique({
		where: {
			id: Number(eventId),
		},
	});

	const ticketTypes = await prisma.ticketType.findMany();

	if (data == null || ticketTypes == null) {
		return <div>ID not found</div>;
	}

	return (
		<div className="m-5">
			<CountdownTimer endTime={info.expiresAt} />
			<div>
				<label htmlFor="">Full Name: </label>
				<input
					type="text"
					name=""
					className="border-gray-500 border block"
				/>
			</div>
			<div>
				<label htmlFor="">Date: </label>
				<input
					type="datetime-local"
					name=""
					className="border-gray-500 border block"
				/>
			</div>
			<div>
				<label htmlFor="">Number of tickets: </label>
				<input
					type="text"
					name=""
					className="border-gray-500 border block"
				/>
			</div>
			<div className="mt-5">
				<button className="bg-gray-400 text-white px-2 py-1 rounded  hover:bg-gray-500 mr-3">
					Cancel
				</button>
				<button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
					Purchase
				</button>
			</div>
		</div>
	);
}
