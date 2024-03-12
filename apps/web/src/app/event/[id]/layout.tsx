import NavigationBar from "@/components/navigation-bar/NavigationBar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col h-screen">
			<NavigationBar />
			<div className="flex justify-center items-center flex-grow overflow-hidden">
				{children}
			</div>
		</div>
	);
}
