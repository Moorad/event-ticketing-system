import { ReactNode } from "react";

export default function LoadingButton({
	children,
	loading,
	className,
	loaderColor = "#FFFFFF",
	onClick,
}: {
	children: ReactNode;
	loading: boolean;
	className?: string;
	loaderColor?: string;
	onClick?: () => any;
}) {
	return (
		<button
			disabled={loading}
			onClick={onClick}
			type="submit"
			className={className}
		>
			{loading ? (
				<div
					className="loader"
					style={{
						borderColor: loaderColor + "80",
						borderRightColor: loaderColor,
					}}
				></div>
			) : (
				children
			)}
		</button>
	);
}
