import EventBlock from "@/components/EventBlock";
import CategorisedEvents from "@/components/landing/CategorisedEvents";
import FeaturedEvents from "@/components/landing/FeaturedEvents";
import NavigationBar from "@/components/navigation-bar/NavigationBar";
import { Event, prisma } from "database";
import { Client } from "minio";

export type EventType = Event & {
	thumbnail: string;
	logo: string;
	startDate: Date;
	endDate: Date | null;
};

export default async function Home() {
	const data = await prisma.event.findMany();

	if (process.env.MINIO_URL == undefined) {
		throw Error("The env variable 'MINIO_URL' is not set");
	} else if (process.env.MINIO_ACCESS_KEY == undefined) {
		throw Error("The env variable 'MINIO_ACCESS_KEY' is not set");
	} else if (process.env.MINIO_SECRET_KEY == undefined) {
		throw Error("The env variable 'MINIO_SECRET_KEY' is not set");
	}

	// const minioClient = new Client({
	// 	endPoint: process.env.MINIO_URL,
	// 	port: 9000,
	// 	useSSL: false,
	// 	accessKey: process.env.MINIO_ACCESS_KEY,
	// 	secretKey: process.env.MINIO_SECRET_KEY,
	// });

	// console.log(
	// 	await minioClient.presignedGetObject(
	// 		"event-thumbnails",
	// 		"19bf95c3-28d5-40cf-877e-40fdd9860826.png"
	// 	)
	// );

	const events: EventType[] = [
		{
			id: 1,
			name: "Formula One",
			description: "abc",
			thumbnail:
				"http://127.0.0.1:9000/event-thumbnails/76be0ba1-d332-47ce-8335-9908133b7268.png",
			logo: "http://127.0.0.1:9000/event-logos/05cf0ac7-f216-40dd-bb30-a5db8707854e.png",
			startDate: new Date(1710100900925),
			endDate: null,
		},
		{
			id: 2,
			name: "Driyah",
			description: "abc",
			thumbnail:
				"http://127.0.0.1:9000/event-thumbnails/19bf95c3-28d5-40cf-877e-40fdd9860826.png",
			logo: "http://127.0.0.1:9000/event-logos/f6b5f97e-6854-461e-99fb-fa241d6add69.png",
			startDate: new Date(1710100900925),
			endDate: null,
		},
		{
			id: 3,
			name: "Wonder Garden",
			description: "abc",
			thumbnail:
				"http://127.0.0.1:9000/event-thumbnails/c56655d0-ea25-4031-8b46-2f616d28487a.png",

			logo: "http://127.0.0.1:9000/event-logos/75037db7-e934-4819-b403-d0077722fa6d.png",
			startDate: new Date(1710100900925),
			endDate: null,
		},
	];

	return (
		<div>
			<NavigationBar />
			<FeaturedEvents events={events} />
			<CategorisedEvents
				title="Upcoming Events"
				events={events
					.map((a) => ({ sort: Math.random(), value: a }))
					.sort((a, b) => a.sort - b.sort)
					.map((a) => a.value)}
			/>
			<CategorisedEvents title="Exclusive on ETS" events={events} />
			<div>Available events:</div>
			<div className="flex flex-wrap gap-2">
				{data.map((event) => (
					<EventBlock data={event} key={event.id} />
				))}
			</div>
		</div>
	);
}
