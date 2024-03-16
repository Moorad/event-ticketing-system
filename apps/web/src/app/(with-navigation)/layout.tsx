import NavigationBar from "@/components/navigation-bar/NavigationBar";
import { ReactNode } from "react";

export default function withNavigationLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="flex flex-col h-screen">
			<NavigationBar />
			{children}
		</div>
	);
}
