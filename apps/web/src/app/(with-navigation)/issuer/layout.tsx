import RequirePermission from "@/components/wrappers/RequirePermission";
import { Permission } from "@/utils/permissions";
import { ReactNode } from "react";

export default function issuerLayout({ children }: { children: ReactNode }) {
	return (
		<RequirePermission permissionId={Permission.ISSUER}>
			<div className="flex flex-col overflow-hidden">{children}</div>
		</RequirePermission>
	);
}
