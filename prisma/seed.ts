import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
	// Available ticket types
	await prisma.ticketType.createMany({
		data: [
			{ type: "Regular", cost: 9.99 },
			{ type: "VIP", cost: 19.99 },
			{ type: "Children", cost: 5.99 },
		],
	});

	// Available permissions
	await prisma.permission.createMany({
		data: [
			{
				description: "Can access consumer routes such as /wallet",
			},
			{
				description:
					"Can access issuer routes such as /issuer/scan-ticket",
			},
		],
	});

	// Available roles
	await prisma.role.createMany({
		data: [{ name: "Consumer" }, { name: "Issuer" }],
	});

	// Wire roles with permissions
	await prisma.rolePermission.createMany({
		data: [
			{ roleId: 1, permissionId: 1 },
			{ roleId: 2, permissionId: 2 },
		],
	});

	await insertFakeData();
}

async function insertFakeData() {
	await prisma.user.create({
		data: {
			fullName: "Moorad",
			role: {
				connect: {
					id: 1,
				},
			},
		},
	});

	let hashedPassword = await bcrypt.hash("Moorad123", 10);

	await prisma.account.create({
		data: {
			email: "moorad@mail.com",
			password: hashedPassword,
			userId: 1,
		},
	});

	await prisma.user.create({
		data: {
			fullName: "Bob",
			role: {
				connect: {
					id: 2,
				},
			},
		},
	});

	hashedPassword = await bcrypt.hash("Bob123", 10);

	await prisma.account.create({
		data: {
			email: "bob@mail.com",
			password: hashedPassword,
			userId: 2,
		},
	});

	let fakeEvents: Prisma.EventCreateManyInput[] = [];

	for (let i = 1; i <= 10; i++) {
		fakeEvents.push({
			id: i,
			name: "Event " + i,
		});
	}

	await prisma.event.createMany({
		data: fakeEvents,
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error("Error occured while seeding the database:");
		console.error(e);

		await prisma.$disconnect();
	});
