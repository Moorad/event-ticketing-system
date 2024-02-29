import { ReactNode } from "react";

export default function FormError({
	children,
	className = "",
}: {
	children?: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={
				"border-orange-500 bg-orange-100 border text-orange-500 py-2 rounded px-3 whitespace-pre-line" +
				(className ? " " + className : "") +
				(children ? "" : " hidden")
			}
		>
			{children}
		</div>
	);
}
