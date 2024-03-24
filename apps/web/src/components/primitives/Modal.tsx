import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
	return (
		<div
			className="w-screen h-screen top-0 left-0 absolute"
			style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
		>
			<div className="absolute-center bg-white w-fit light-drop-shadow px-4 py-4 rounded ">
				{children}
			</div>
		</div>
	);
}
