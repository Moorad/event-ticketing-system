import { plainDate } from "@/utils/time";
import {
	faCalendarDays,
	faDollarSign,
	faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { prisma } from "database";
import Image from "next/image";
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
		include: {
			EventLocation: true,
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

	if (data == null) {
		return <div>ID not found</div>;
	}
	const cheapestTicket = data.TicketType[0].cost;

	return (
		<div className="flex justify-center items-center flex-grow overflow-hidden">
			<div className="h-full p-5">
				<div className="max-w-[800px] h-full light-drop-shadow rounded-md p-5 bg-white overflow-y-auto">
					<Image
						className="w-full aspect-[4/1] object-cover rounded-md"
						src={data.thumbnail}
						alt=""
					/>
					<div className="font-bold text-2xl my-3">{data.name}</div>
					<div className="whitespace-pre-wrap">
						{data.description}
					</div>
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
							<div>From {cheapestTicket} SAR</div>
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
		</div>
	);
}
