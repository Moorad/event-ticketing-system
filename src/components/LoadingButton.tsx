import { ReactNode } from "react";

export default function LoadingButton({
	children,
	loading,
	className,
	onClick,
}: {
	children: ReactNode;
	loading: boolean;
	className?: string;
	onClick?: () => any;
}) {
	return (
		<button
			disabled={loading}
			onClick={onClick}
			type="submit"
			className={className}
		>
			{loading ? "Submitting..." : children}
		</button>
	);
}
