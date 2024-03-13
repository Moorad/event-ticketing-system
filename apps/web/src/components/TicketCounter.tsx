import { numberFormat } from "@/utils/format";

export default function TicketCounter(props: {
	label: string;
	cost: number;
	value: number;
	increment: () => any;
	decrement: () => any;
}) {
	return (
		<div>
			<div>{props.label}:</div>
			<div className="flex gap-3 ">
				<button
					onClick={props.decrement}
					type="button"
					className="hover:bg-gray-100 w-7"
				>
					-
				</button>
				<input
					className="bg-gray-200 w-12 text-center"
					value={props.value}
					disabled
				/>
				<button
					onClick={props.increment}
					type="button"
					className="hover:bg-gray-100 w-7"
				>
					+
				</button>
				<div>
					× {props.cost} SAR =
					{numberFormat(props.cost * props.value, 2)} SAR
				</div>
			</div>
		</div>
	);
}
