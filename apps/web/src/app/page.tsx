import EventBlock from "@/components/EventBlock";
import NavigationBar from "@/components/navigation-bar/NavigationBar";
import { prisma } from "database";

export default async function Home() {
	const data = await prisma.event.findMany();

	return (
		<div>
			<NavigationBar />
			<div>Available events:</div>
			<div className="flex flex-wrap gap-2">
				{data.map((event) => (
					<EventBlock data={event} key={event.id} />
				))}
			</div>
		</div>
	);
}
