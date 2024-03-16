import NavigationBar from "@/components/navigation-bar/NavigationBar";
import RequirePermission from "@/components/wrappers/RequirePermission";
import { ReactNode } from "react";

export default function issuerLayout({ children }: { children: ReactNode }) {
	return (
		<RequirePermission permissionId={2}>
			<div className="flex flex-col overflow-hidden">{children}</div>
		</RequirePermission>
	);
}
