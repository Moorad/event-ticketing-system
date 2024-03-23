import { options } from "@/app/api/auth/[...nextauth]/options";
import { checkPermission } from "@/utils/permissions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RequirePermission({
	children,
	permissionId,
}: {
	children: React.ReactNode;
	permissionId: number;
}) {
	const session = await getServerSession(options);

	const hasPermission = await checkPermission(session, permissionId);

	if (!hasPermission) {
		redirect("/");
	}

	return <>{children}</>;
}
