import EventBlock from "@/components/EventBlock";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

export default async function Home() {
	const prisma = new PrismaClient();
	const data = await prisma.event.findMany();

	// const { data: session, status } = useSession();

	console.log(data);

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
