import { numberFormat } from "@/utils/format";
import { TicketType } from "database";
import { useContext } from "react";
import { TicketsContext } from "../PurchasePage";
import LoadingButton from "@/components/LoadingButton";

export default function SummarySection({
	submitting,
	checkoutHandler,
}: {
	submitting: boolean;
	checkoutHandler: Function;
}) {
	const ctx = useContext(TicketsContext);

	function computeSubtotal() {
		return ctx.tickets.reduce((acc, curr) => acc + curr.cost, 0);
	}

	function computeVAT() {
		return computeSubtotal() * 0.15;
	}

	return (
		<div className="p-3 md:min-w-[25vw] max-md:min-h-[25vh]">
			<div className="bg-white rounded light-drop-shadow h-full p-5 flex flex-col">
				<div className="text-xl font-semibold pb-5">Summary</div>
				<hr />
				<div className="flex-grow overflow-y-auto h-72 py-3">
					{ctx.tickets.map((ticket, i) => (
						<div className="flex font-semibold" key={i}>
							<div>{ticket.name} ticket</div>
							<div className="ml-auto w-1/3 text-right">
								{ticket.cost} SAR
							</div>
						</div>
					))}
				</div>
				<hr className="py-2" />
				<div>
					<div className="text-sm flex">
						<div>Subtotal</div>
						<div className="ml-auto">
							{numberFormat(computeSubtotal(), 2)} SAR
						</div>
					</div>
					<div className="text-sm flex">
						<div>VAT</div>
						<div className="ml-auto">
							{numberFormat(computeVAT(), 2)} SAR
						</div>
					</div>
					<div className="font-semibold flex">
						<div>Total</div>
						<div className="ml-auto">
							{numberFormat(computeSubtotal() + computeVAT(), 2)}{" "}
							SAR
						</div>
					</div>
					<LoadingButton
						loading={submitting}
						className="bg-brand-red w-full text-white rounded py-1 mt-4"
						onClick={() => checkoutHandler()}
					>
						Go to checkout
					</LoadingButton>
				</div>
			</div>
		</div>
	);
}
