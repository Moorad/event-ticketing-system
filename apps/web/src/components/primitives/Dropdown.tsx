export default function Dropdown({
	label,
	name,
	values,
	options,
	className = "",
}: {
	label: string;
	name: string;
	values: string[] | number[];
	options: string[];
	className?: string;
}) {
	return (
		<div>
			<label className="block text-gray-500">{label}</label>
			<select
				name={name}
				className={
					"border-gray-300 border rounded px-4 py-2 " + className
				}
			>
				{options.map((opt, i) => (
					<option key={values[i]} value={values[i]}>
						{opt}
					</option>
				))}
			</select>
		</div>
	);
}
