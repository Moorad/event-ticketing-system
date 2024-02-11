import NavigationBar from "@/components/NavigationBar";
import RequirePermission from "@/components/wrappers/RequirePermission";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<NavigationBar />
			<RequirePermission permissionId={1}>{children}</RequirePermission>
		</>
	);
}
