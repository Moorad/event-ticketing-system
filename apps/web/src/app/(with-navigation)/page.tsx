import CategorisedEvents from "@/components/landing/CategorisedEvents";
import FeaturedEvents from "@/components/landing/FeaturedEvents";
import SearchEvents from "@/components/landing/SearchEvents";
import { shuffle } from "@/utils/transform";
import { prisma } from "database";

export default async function Home() {
	const events = await prisma.event.findMany({
		include: {
			TicketType: {
				select: {
					cost: true,
				},
				orderBy: {
					cost: "asc",
				},
				take: 1,
			},
		},
	});

	return (
		<div className="p-5">
			<FeaturedEvents events={events.filter((e) => e.isFeatured)} />
			<CategorisedEvents
				title="Upcoming Events"
				events={shuffle(events)}
			/>
			<CategorisedEvents
				title="Recommended For You"
				events={shuffle(events)}
			/>
			<div className="font-bold text-xl mt-10">All Events</div>
			<SearchEvents initValue={events} />
		</div>
	);
}
