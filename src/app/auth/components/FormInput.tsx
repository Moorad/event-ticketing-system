import {
	HTMLInputTypeAttribute,
	LegacyRef,
	MutableRefObject,
	forwardRef,
} from "react";

function FormInput(
	{
		name,
		type,
		placeholder,
	}: {
		name: string | undefined;
		type: HTMLInputTypeAttribute | undefined;
		placeholder: string | undefined;
	},
	ref: LegacyRef<HTMLInputElement> | undefined
) {
	return (
		<input
			ref={ref}
			name={name}
			type={type}
			placeholder={placeholder}
			className="border-gray-200 border bg-gray-100 w-auto py-2 px-4 rounded-sm text-sm"
		/>
	);
}

export default forwardRef(FormInput);
