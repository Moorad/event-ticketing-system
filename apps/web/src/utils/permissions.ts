import { prisma } from "database";
import { Session } from "next-auth";

export enum Permission {
	CONSUMER = 1,
	ISSUER = 2,
}

export async function checkPermission(
	session: Session | null,
	permissionId: number
) {
	// User is not logged in
	if (!session) {
		return false;
	}

	const userPermissions = await prisma.user.findFirst({
		include: {
			role: {
				include: { permissions: true },
			},
		},
		where: { id: session.user.id },
	});

	// User has no role assigned
	if (!userPermissions) {
		return false;
	}

	// Check if role has required permission
	const hasPermission = userPermissions.role.permissions.some(
		(p) => p.permissionId == permissionId
	);

	return hasPermission;
}
