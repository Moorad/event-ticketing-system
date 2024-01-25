import LoadingButton from "@/components/LoadingButton";

export default function FormButton({
	text,
	loading,
}: {
	text: string;
	loading: boolean;
}) {
	return (
		<LoadingButton
			loading={loading}
			className="bg-brand-red text-white w-auto mt-16 py-2 rounded text-sm"
		>
			{text}
		</LoadingButton>
	);
}
