import Perforation from "../../../../components/ticket/Perforation";
import { SparseTicket } from "../page";

export default function CollapsedTicket({
	data,
	onClick,
}: {
	data: SparseTicket;
	onClick: () => void;
}) {
	return (
		<div
			className="bg-white w-72 rounded-lg light-drop-shadow h-fit hover:cursor-pointer"
			onClick={() => onClick()}
		>
			<div className="flex gap-3 py-5 px-5">
				<div className="w-6 h-6 bg-gray-300"></div>
				<div>{data.event.name}</div>
				<div className="bg-gray-700 text-white py-1 px-4 rounded-full ml-auto text-sm h-fit">
					{data.ticketType.name}
				</div>
			</div>
			<Perforation
				sideCutOutClassName="bg-brand-gray"
				middleCutOutClassName="border-brand-gray"
			/>
			<div className="py-4 px-3 text-center text-gray-400">
				Click to expand
			</div>
		</div>
	);
}
