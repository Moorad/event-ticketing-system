import { plainDate } from "@/utils/time";
import {
	faCalendarDays,
	faDollarSign,
	faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
		include: { EventLocation: true },
	});

	if (data == null) {
		return <div>ID not found</div>;
	}

	return (
		<div className="h-full p-5">
			<div className="max-w-[800px] h-full light-drop-shadow rounded-md p-5 bg-white overflow-y-auto">
				<img
					className="w-full aspect-[4/1] object-cover rounded-md"
					src={data.thumbnail}
					alt=""
				/>
				<div className="font-bold text-2xl my-3">{data.name}</div>
				<div className="whitespace-pre-wrap">{data.description}</div>
				<div className="flex justify-between items-start mt-8 mb-3">
					<div className="text-black flex text-sm">
						<div>
							<FontAwesomeIcon
								icon={faCalendarDays}
								className="w-3 mr-2"
							/>
						</div>
						<div>
							{plainDate(new Date(data.startDate))}{" "}
							{data.endDate &&
								"- " + plainDate(new Date(data.endDate))}
						</div>
					</div>
					<div className="text-black flex text-sm">
						<div>
							<FontAwesomeIcon
								icon={faDollarSign}
								className="w-3 mr-2"
							/>
						</div>
						<div>From 180 SAR</div>
					</div>
					<div className="text-black flex text-sm">
						<div>
							<FontAwesomeIcon
								icon={faLocationDot}
								className="w-3 mr-2"
							/>
						</div>
						<div className="flex flex-col">
							{data.EventLocation.map((e) => (
								<div key={e.id}>• {e.name}</div>
							))}
						</div>
					</div>
				</div>
				<Link href={`/event/${params.id}/purchase`}>
					<button className="bg-brand-red text-white px-16 py-2 rounded mt-5">
						Book ticket
					</button>
				</Link>
			</div>
		</div>
	);
}
