import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { StepType } from "./StepRenderer";
import { Fragment } from "react";

export default function StepsView({
	steps,
	currentStep,
}: {
	steps: StepType[];
	currentStep: number;
}) {
	return (
		<div className="bg-white w-48 light-drop-shadow rounded-md h-fit py-3">
			{steps.map((step, i) => (
				<Fragment key={i}>
					<div className="flex items-center py-2 px-5 gap-5 cursor-pointer hover:bg-gray-100">
						{i < currentStep ? (
							<div className="w-6 h-6 bg-brand-red text-white rounded-full text-xs flex justify-center items-center">
								<FontAwesomeIcon icon={faCheck} />
							</div>
						) : (
							<div className="w-6 h-6 bg-gray-200 rounded-full text-xs flex justify-center items-center">
								{i + 1}
							</div>
						)}
						<div className="text-sm">{step.name}</div>
					</div>
					{i < steps.length - 1 && <hr />}
				</Fragment>
			))}
		</div>
	);
}
