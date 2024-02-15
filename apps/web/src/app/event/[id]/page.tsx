import { prisma } from "database";
import Link from "next/link";

export default async function eventIdPage({
	params,
}: {
	params: { id: string };
}) {
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
			<Link href={`/event/${params.id}/purchase`}>
				<button className="bg-blue-500 text-white px-2 py-1 rounded mt-5 hover:bg-blue-600">
					Purchase ticket
				</button>
			</Link>
		</div>
	);
}
