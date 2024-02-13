import { ReactNode } from "react";

export default function FormError({ children }: { children?: ReactNode }) {
	return (
		<div
			className={
				"border-orange-500 bg-orange-100 border text-orange-500 py-2 rounded px-3" +
				(children ? "" : " hidden")
			}
		>
			{children}
		</div>
	);
}
