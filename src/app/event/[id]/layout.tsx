import NavigationBar from "@/components/navigation-bar/NavigationBar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<NavigationBar />
			{children}
		</>
	);
}
