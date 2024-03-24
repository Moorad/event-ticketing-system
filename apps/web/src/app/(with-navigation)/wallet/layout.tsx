import RequirePermission from "@/components/wrappers/RequirePermission";
import { Permission } from "@/utils/permissions";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<RequirePermission permissionId={Permission.CONSUMER}>
			{children}
		</RequirePermission>
	);
}
