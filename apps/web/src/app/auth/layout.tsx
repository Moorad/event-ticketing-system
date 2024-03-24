import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="h-screen overflow-hidden">
			<Image
				className="absolute w-full h-full object-cover"
				src="/blobs.svg"
				alt="blobs"
			/>
			<div className="h-full">
				<div
					className="bg-white w-96 px-8 py-8 rounded-md min-h-96
                light-drop-shadow absolute-center"
				>
					{children}
				</div>
			</div>
		</div>
	);
}
