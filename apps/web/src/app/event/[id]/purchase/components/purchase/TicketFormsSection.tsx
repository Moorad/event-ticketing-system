import TicketForm from "./TicketForm";
import { useContext } from "react";
import { TicketsContext } from "../PurchasePage";
import FormError from "@/app/auth/components/FormError";

export default function TicketFormsSection({
	addTicketHandler,
	error,
}: {
	addTicketHandler: Function;
	error: string[] | null;
}) {
	const ctx = useContext(TicketsContext);

	return (
		<div className="p-3 flex-grow overflow-y-auto h-full">
			<div className="mb-5">
				<FormError>
					{error && (
						<>
							One or more of you tickets has the following errors:
							<ul>
								{error.map((err) => (
									<li className="ml-4">• {err}</li>
								))}
							</ul>
						</>
					)}
				</FormError>
			</div>
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
