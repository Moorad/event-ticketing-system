import NavigationBar from "@/components/NavigationBar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<NavigationBar />
			{children}
		</>
	);
}
