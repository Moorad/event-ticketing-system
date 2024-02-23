import { HTMLInputTypeAttribute } from "react";

export default function Input({
	label,
	name,
	type,
	className = "",
	placeholder,
}: {
	label: string;
	name: string;
	type?: HTMLInputTypeAttribute;
	className?: string;
	placeholder?: string;
}) {
	return (
		<div>
			<label className="block text-gray-500 text-left">{label}</label>
			<input
				name={name}
				placeholder={placeholder}
				className={
					"border-gray-300 border rounded px-4 py-2 " + className
				}
				type={type}
			/>
		</div>
	);
}
