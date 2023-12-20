export default function LoaderButton(props: {
	text: string;
	loading: boolean;
	onClick: () => any;
}) {
	return (
		<button
			disabled={props.loading}
			onClick={props.onClick}
			type="submit"
			className="bg-gray-300 px-2 py-1 rounded disabled:bg-gray-100"
		>
			{props.loading ? "Submitting..." : props.text}
		</button>
	);
}
