import { MouseEventHandler, ReactNode } from "react";

export default function LoadingButton({
	children,
	loading,
	className,
	loaderColor = "#FFFFFF",
	onClick,
	disabled = false,
}: {
	children: ReactNode;
	loading: boolean;
	className?: string;
	loaderColor?: string;
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	disabled?: boolean;
}) {
	return (
		<button
			disabled={disabled || loading}
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
