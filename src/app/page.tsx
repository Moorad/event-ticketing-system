import EventBlock from "@/components/EventBlock";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
	const prisma = new PrismaClient();
	const data = await prisma.event.findMany();

	return (
		<div>
			<div>Available events:</div>
			<div className="flex flex-wrap gap-2">
				{data.map((event) => (
					<EventBlock data={event} />
				))}
			</div>
		</div>
	);
}
