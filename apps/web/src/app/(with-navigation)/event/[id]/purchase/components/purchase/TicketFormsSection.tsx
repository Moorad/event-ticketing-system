import TicketForm from "./TicketForm";
import { useContext } from "react";
import { TicketsContext } from "../PurchasePage";
import FormError from "@/app/auth/components/FormError";

export default function TicketFormsSection({
	addTicketHandler,
	error,
}: {
	addTicketHandler: () => void;
	error: string | null;
}) {
	const ctx = useContext(TicketsContext);

	return (
		<div className="p-3 flex-grow overflow-y-auto h-full">
			<FormError className="mb-5">{error && <>{error}</>}</FormError>
			<div className="flex flex-col gap-5">
				{ctx.tickets.map((ticket, i) => (
					<TicketForm
						key={i}
						formRef={ctx.ticketFormRefs[i]}
						event={ctx.event}
						ticket={ticket}
					/>
				))}
				<div className="flex justify-center">
					<button
						className="bg-brand-red text-white rounded py-1 px-3"
						onClick={() => addTicketHandler()}
					>
						+ Add another ticket
					</button>
				</div>
			</div>
		</div>
	);
}
