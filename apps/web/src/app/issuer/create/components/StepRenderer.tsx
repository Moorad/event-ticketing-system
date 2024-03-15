import EventStep from "./steps/EventStep";
import TicketStep from "./steps/TicketStep";
import PreviewStep from "./steps/PreviewStep";
import { ReactNode } from "react";

export type StepType = {
	id: number;
	name: string;
	component: ReactNode;
};

export const steps: StepType[] = [
	{
		id: 0,
		name: "Event",
		component: <EventStep />,
	},
	{
		id: 1,
		name: "Tickets",
		component: <TicketStep />,
	},
	{
		id: 2,
		name: "Preview",
		component: <PreviewStep />,
	},
];

export default function StepRenderer({ stepId }: { stepId: number }) {
	return <>{stepId < steps.length && steps[stepId].component}</>;
}
