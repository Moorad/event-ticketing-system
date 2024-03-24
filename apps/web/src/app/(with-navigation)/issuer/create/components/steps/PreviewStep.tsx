import { useContext } from "react";
import { EventFormContext } from "../../context/EventFormContext";
import { plainDate } from "@/utils/time";
import Image from "next/image";

export default function PreviewStep() {
	const ctx = useContext(EventFormContext);

	function empty(value: string) {
		return value || <span className="text-gray-400">(empty)</span>;
	}

	return (
		<div>
			<div className="font-semibold">Event Details</div>
			<hr className="my-3" />
			<div className="flex flex-col gap-5">
				<div>
					<div>Name</div>
					<div className="text-sm">{empty(ctx.event.name)}</div>
				</div>
				<div>
					<div>Description</div>
					<div className="text-sm">
						{empty(ctx.event.description)}
					</div>
				</div>
				<div>
					<div>Date</div>
					<div className="text-sm">
						{empty(
							plainDate(ctx.event.startDate) +
								(ctx.event.endDate
									? " - " + plainDate(ctx.event.endDate)
									: ""),
						)}
					</div>
				</div>
				<div>
					<div>Location</div>
					<div className="text-sm">{empty(ctx.event.location)}</div>
				</div>
				<div>
					<div>Thumbnail</div>
					<div className="text-sm">
						{ctx.event.thumbnail ? (
							<Image
								className="aspect-[10/4] object-cover rounded-md w-64"
								src={ctx.event.thumbnail}
								alt=""
							/>
						) : (
							<span className="text-gray-400">(empty)</span>
						)}
					</div>
				</div>
				<div>
					<div>Logo</div>
					<div className="text-sm">
						{ctx.event.logo ? (
							<div className="bg-gray-300 rounded-md w-32 p-2">
								<Image
									src={ctx.event.logo}
									className="aspect-square object-contain"
									alt=""
								/>
							</div>
						) : (
							<span className="text-gray-400">(empty)</span>
						)}
					</div>
				</div>
			</div>
			<hr className="my-3" />
			<div className="font-semibold">Ticket Details</div>
			<div className="flex flex-col gap-5">
				{ctx.tickets.map((t, i) => {
					return (
						<div key={i}>
							<div className="mt-3">Ticket {i + 1}</div>
							<div className="pl-7 flex flex-col gap-3">
								<div>
									<div>Name</div>
									<div className="text-sm">
										{empty(t.name)}
									</div>
								</div>
								<div>
									<div>Description</div>
									<div className="text-sm">
										{empty(t.description)}
									</div>
								</div>
								<div>
									<div>Price</div>
									<div className="text-sm">
										{empty(t.cost + " SAR")}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
