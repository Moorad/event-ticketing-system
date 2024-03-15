import { ReactNode } from "react";

export default function FieldRow({
	title,
	description,
	required = true,
	children,
}: {
	title: string;
	description: string;
	required?: boolean;
	children: ReactNode;
}) {
	return (
		<div className="flex justify-between">
			<div className="w-2/5">
				<div className="font-semibold mb-2 text-sm">
					{title}
					{required && (
						<span className="text-red-500 font-normal">*</span>
					)}
				</div>
				<div className="text-gray-400 text-sm">{description}</div>
			</div>
			<div className="w-1/2 pt-3">{children}</div>
		</div>
	);
}
