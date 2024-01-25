import { HTMLInputTypeAttribute } from "react";

export default function FormInput({
	name,
	type,
	placeholder,
}: {
	name: string | undefined;
	type: HTMLInputTypeAttribute | undefined;
	placeholder: string | undefined;
}) {
	return (
		<input
			name={name}
			type={type}
			placeholder={placeholder}
			className="border-gray-200 border bg-gray-100 w-auto py-2 px-4 rounded-sm text-sm"
		/>
	);
}
