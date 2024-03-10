import EventBlock from "@/components/EventBlock";
import FeaturedEvents from "@/components/landing/FeaturedEvents";
import NavigationBar from "@/components/navigation-bar/NavigationBar";
import { prisma } from "database";
import { Client } from "minio";

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

	const events = [
		{
			id: 1,
			name: "Formula One",
			description: "abc",
			thumbnail:
				"http://127.0.0.1:9000/event-thumbnails/76be0ba1-d332-47ce-8335-9908133b7268.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zvCRdgiqt1Dd096irJfD%2F20240310%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240310T094303Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=c462d764e1e78507d42cb426051725a22ade6afe22808da943775c964863e28d",
			logo: "http://127.0.0.1:9000/event-logos/05cf0ac7-f216-40dd-bb30-a5db8707854e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zvCRdgiqt1Dd096irJfD%2F20240310%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240310T095627Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=f943463efe7444660ede86c033df1d01fd6f4b44d3d6ce945a5697a65261ff7c",
		},
		{
			id: 2,
			name: "Driyah",
			description: "abc",
			thumbnail:
				"http://127.0.0.1:9000/event-thumbnails/19bf95c3-28d5-40cf-877e-40fdd9860826.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zvCRdgiqt1Dd096irJfD%2F20240310%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240310T095627Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=93b857c363ffa3ed6e63ac8dd46a5d84af90d8fa3e2aba3df14250cff045a1fa",
			logo: "http://127.0.0.1:9000/event-logos/f6b5f97e-6854-461e-99fb-fa241d6add69.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zvCRdgiqt1Dd096irJfD%2F20240310%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240310T095627Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=a5be5c7ecb949c63beba5a555047e74d1c7acca04627213d664e6c770e488d6a",
		},
		{
			id: 3,
			name: "Wonder Garden",
			description: "abc",
			thumbnail:
				"http://127.0.0.1:9000/event-thumbnails/c56655d0-ea25-4031-8b46-2f616d28487a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zvCRdgiqt1Dd096irJfD%2F20240310%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240310T094343Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=e415ea42bc8ce91e3182a73407a576bc07787c015582731476a1e089f081cbcd",

			logo: "http://127.0.0.1:9000/event-logos/75037db7-e934-4819-b403-d0077722fa6d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zvCRdgiqt1Dd096irJfD%2F20240310%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240310T095627Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=161d5adb548d9179fa52826015785a42e261a0635b5c5980177b735ba57445f3",
		},
	];

	return (
		<div>
			<NavigationBar />
			<FeaturedEvents events={events} />
			<div>Available events:</div>
			<div className="flex flex-wrap gap-2">
				{data.map((event) => (
					<EventBlock data={event} key={event.id} />
				))}
			</div>
			<button></button>
		</div>
	);
}
