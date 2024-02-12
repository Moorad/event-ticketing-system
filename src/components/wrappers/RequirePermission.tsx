import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/utils/db";
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

	let userPermissions = await prisma.user.findFirst({
		include: {
			role: {
				include: { permissions: true },
			},
		},
		where: { id: session?.user.id },
	});

	// User has no role assigned
	if (userPermissions == null) {
		redirect("/");
	}

	// Check if role has required permission
	const hasPermissions = userPermissions.role.permissions.some(
		(p) => p.permissionId == permissionId
	);

	// Does not have required permission
	if (!hasPermissions) {
		redirect("/");
	}

	return <>{children}</>;
}
