import { plainDate } from "@/utils/time";
import { Event } from "database";
import Link from "next/link";

export default function CategorisedEvents({
	title,
	events,
}: {
	title: string;
	events: Event[];
}) {
	return (
		<div>
			<div className="font-bold text-xl mt-10 ">{title}</div>
			<div className="flex gap-5 overflow-x-auto z-10 py-2">
				{events.map((e, i) => (
					<Link href={`/event/${e.id}`} key={i}>
						<div className="w-96 rounded relative flex-shrink-0">
							<img
								src={e.thumbnail}
								className="rounded aspect-[10/4] object-cover"
								alt=""
							/>
							<div className="absolute top-0 left-0 bg-gradient-to-t rounded from-brand-black to-transparent z-10 w-full h-full"></div>
							<div className="absolute bottom-2 left-3 rounded text-white z-20">
								<div className="text-lg font-semibold">
									{e.name}
								</div>
								<div className="text-sm">
									{plainDate(e.startDate)}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
