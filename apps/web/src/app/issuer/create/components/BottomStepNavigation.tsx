import { steps } from "./StepRenderer";

export default function BottomStepNavigation({
	currentStep,
	handleNextStep,
	handlePreviousStep,
	handleSubmission,
}: {
	currentStep: number;
	handleNextStep: () => void;
	handlePreviousStep: () => void;
	handleSubmission: () => void;
}) {
	return (
		<>
			<hr className="my-3" />
			<div className="flex">
				{currentStep > 0 && (
					<button
						className="bg-brand-black text-sm py-2 px-3 text-white rounded"
						onClick={handlePreviousStep}
					>
						Previous
					</button>
				)}
				{currentStep < steps.length - 1 ? (
					<button
						className="bg-brand-black text-sm py-2 px-3 text-white rounded ml-auto"
						onClick={handleNextStep}
					>
						Next
					</button>
				) : (
					<button
						className="bg-brand-black text-sm py-2 px-3 text-white rounded ml-auto"
						onClick={handleSubmission}
					>
						Submit
					</button>
				)}
			</div>
		</>
	);
}
