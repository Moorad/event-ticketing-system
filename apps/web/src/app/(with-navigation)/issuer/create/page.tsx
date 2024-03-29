"use client";

import { useState } from "react";
import StepsView from "./components/StepsView";
import { Event, TicketType } from "database";
import StepRenderer, { steps } from "./components/StepRenderer";
import BottomStepNavigation from "./components/BottomStepNavigation";
import useFetch from "@/utils/hooks/useFetch";
import FormError from "@/app/auth/components/FormError";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EventFormContext } from "./context/EventFormContext";

export type BasicEvent = Pick<
	Event,
	"name" | "description" | "startDate" | "endDate" | "thumbnail" | "logo"
> & { location: string };
export type BasicTicketType = Pick<TicketType, "name" | "description" | "cost">;

export default function issuerCreate() {
	const [currentStep, setCurrentStep] = useState(0);
	const [event, setEvent] = useState<BasicEvent>({
		name: "",
		description: "",
		startDate: new Date(),
		endDate: null,
		logo: null,
		thumbnail: "",
		location: "",
	});
	const [tickets, setTickets] = useState<BasicTicketType[]>([
		{
			name: "",
			description: "",
			cost: 0,
		},
	]);
	const { error, request } = useFetch();
	const session = useSession();
	const router = useRouter();

	function handleNextStep() {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	}

	function handlePreviousStep() {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	}

	async function handleSubmission() {
		const res = await request("/api/event", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: session.data?.user.id,
				event: event,
				tickets: tickets,
			}),
		});

		if (res.ok) {
			router.push(`/event/${res.body.eventId}`);
		}
	}

	return (
		<EventFormContext.Provider
			value={{
				event: event,
				setEvent: setEvent,
				tickets: tickets,
				setTickets: setTickets,
			}}
		>
			<div className="flex flex-grow overflow-hidden p-5 gap-5 justify-center">
				<StepsView steps={steps} currentStep={currentStep} />
				<div className="bg-white w-[700px] light-drop-shadow rounded-md py-7 px-7 h-full overflow-x-auto">
					<FormError className="mb-3">{error}</FormError>
					<StepRenderer stepId={currentStep} />
					<BottomStepNavigation
						currentStep={currentStep}
						handleNextStep={handleNextStep}
						handlePreviousStep={handlePreviousStep}
						handleSubmission={handleSubmission}
					/>
				</div>
			</div>
		</EventFormContext.Provider>
	);
}
