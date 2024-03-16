"use client";

import Scanner, { QRValueType } from "./components/Scanner";
import LoadingButton from "@/components/LoadingButton";
import useFetch from "@/utils/hooks/useFetch";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import FormError from "@/app/auth/components/FormError";

export default function Scan() {
	const [ticketId, setTicketId] = useState<number | null>(null);
	const [inputValue, setInputValue] = useState("");
	const { loading, error, request } = useFetch();
	const [success, setSuccess] = useState<string | null>(null);
	const session = useSession();

	function handleQRCode(value: QRValueType) {
		setTicketId(value.ticketId);
		setInputValue("#" + String(value.ticketId));
	}

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value);

		if (e.target.value.startsWith("#")) {
			setTicketId(Number.parseInt(e.target.value.substring(1)));
		} else {
			setTicketId(Number.parseInt(e.target.value));
		}
	}

	async function handleSubmit() {
		const res = await request(`/api/tickets/${ticketId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				consumerId: Number(session.data?.user.id),
			}),
		});

		if (res.ok) {
			setSuccess("Ticket consumed successfully!");
		}
	}

	return (
		<div className="sm:justify-center mx-auto p-10">
			<FormError className="mb-5">{error}</FormError>
			<FormError className="mb-5">{success}</FormError>
			<div className="flex max-sm:flex-col gap-5 max-sm:max-w-[400px] sm:h-[400px] ">
				<Scanner detectedQRCode={handleQRCode} />
				<div className="text-center text-xl font-semibold text-gray-400 flex flex-col justify-center">
					or
				</div>
				<div className="flex flex-col justify-center">
					<div>
						<label className="block text-gray-500 text-left">
							Ticket number
						</label>
						<input
							value={inputValue}
							name="ticketNumber"
							placeholder="#19183892"
							className={
								"border-gray-300 border rounded px-4 py-2 w-full text-left"
							}
							onChange={handleInputChange}
						/>
					</div>
					<LoadingButton
						disabled={ticketId == null || Number.isNaN(ticketId)}
						loading={loading}
						className="bg-brand-red text-white w-full mt-16 py-2 rounded text-sm disabled:opacity-50"
						onClick={handleSubmit}
					>
						Consume
					</LoadingButton>
				</div>
			</div>
		</div>
	);
}
