import Perforation from "@/components/ticket/Perforation";
import QRCode from "react-qr-code";
import { DetailedTicket } from "./WalletPage";
import { extractTimeElements } from "@/utils/time";

export default function FullTicket({ data }: { data: DetailedTicket }) {
	const { year, month, day, hour, minute } = extractTimeElements(
		new Date(data.bookedDate)
	);

	return (
		<div className="bg-white w-72 rounded-lg light-drop-shadow h-fit">
			<div className="flex flex-col gap-3 p-5">
				<div className="flex gap-3">
					<div className="w-6 h-6 bg-gray-300"></div>
					<div>{data.event.name}</div>
					<div className="bg-gray-700 text-white text-sm px-5 py-1 rounded-full ml-auto">
						{data.ticketType.name}
					</div>
				</div>
				<div className="flex">
					<div className="pr-5">
						<div className="text-center w-fit">
							<div className="text-sm font-semibold leading-none">
								{month}
							</div>
							<div className="text-2xl font-bold leading-none">
								{day}
							</div>
							<div className="text-xs font-semibold leading-none">
								{year}
							</div>
						</div>
					</div>
					<div className="flex-grow">
						<div className="font-semibold text-sm text-gray-500 leading-none">
							Location
						</div>
						<div className="font-semibold leading-none">
							{data.EventLocation.name}
						</div>
					</div>
				</div>
				<div className="text-center text-2xl font-bold py-5">
					{hour}:{minute}
				</div>
				<div className="flex flex-wrap gap-3 justify-between">
					<div>
						<div className="text-gray-500">Attendee name</div>
						<div className="font-semibold text-lg">
							{data.associatedName}
						</div>
					</div>
					<div>
						<div className="text-gray-500">Seat no.</div>
						<div className="font-semibold text-lg">
							{data.seatNo}
						</div>
					</div>
					<div>
						<div className="text-gray-500">Ticket number</div>
						<div className="font-semibold text-lg">#{data.id}</div>
					</div>
				</div>
			</div>
			<Perforation
				sideCutOutClassName="bg-brand-gray"
				middleCutOutClassName="border-brand-gray"
			/>
			<div className="py-4 px-3 text-center text-gray-400">
				<div className="px-12 py-5">
					<QRCode
						className="w-full h-fit"
						value="https://google.com/"
					/>
				</div>
			</div>
		</div>
	);
}
