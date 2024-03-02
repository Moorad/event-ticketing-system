import { ReqBodyType } from "./CheckoutRouter";
import Input from "@/components/primitives/Input";
import LoadingButton from "@/components/LoadingButton";
import { TicketType } from "database";
import { numberFormat } from "@/utils/format";
import { useRouter } from "next/navigation";
import useFetch from "@/utils/hooks/useFetch";

export default function PaymentPage({
	payload,
	ticketTypes,
}: {
	payload: ReqBodyType | null;
	ticketTypes: TicketType[];
}) {
	const router = useRouter();
	const { loading, error, request } = useFetch();

	function computeTotal() {
		if (payload) {
			return (
				payload?.tickets.reduce((acc, curr) => {
					let cost = 0;
					const tt = ticketTypes.find(
						(tt) => tt.id == Number(curr.ticketType)
					);
					if (tt) {
						cost = tt.cost;
					}

					return acc + cost;
				}, 0) * 1.15
			);
		}

		return 0;
	}

	async function handleSubmission() {
		const res = await request("/api/tickets", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (res.ok) {
			router.push("/wallet");
		}
	}

	return (
		<div className="flex-grow flex justify-center items-center ">
			<div className="bg-white w-96 px-8 py-8 rounded-md light-drop-shadow h-fit">
				<div>
					<div className="font-semibold text-2xl text-center">
						Payment details
					</div>
					<div className="text-center mb-12">
						Total amount:{" "}
						<span className="font-semibold">
							${numberFormat(computeTotal(), 2)}
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<Input
							name="fullName"
							label="Full Name"
							className="w-full text-left"
							placeholder="Cardholder's full name"
						/>
						<Input
							name="cardNumber"
							label="Card Number"
							className="w-full text-left"
							placeholder="123 123 123 123"
						/>
						<div className="flex justify-between w-full">
							<Input
								name="expiryDate"
								label="Expiry Date"
								className="w-36"
								placeholder="MM/YY"
							/>
							<Input
								name="securityCode"
								label="Security Code"
								className="w-36"
								placeholder="CVV"
							/>
						</div>
					</div>
					<LoadingButton
						className="bg-brand-red mt-12 w-full text-white rounded py-2"
						loading={loading}
						onClick={handleSubmission}
					>
						Submit
					</LoadingButton>
				</div>
			</div>
		</div>
	);
}
