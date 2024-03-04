import { prisma } from "../client";
import type { EventLocation, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';

async function main() {
	// Available ticket types
	await prisma.ticketType.createMany({
		data: [
			{
				name: "Children",
				description:
					"Join the fun-filled event with our Children Ticket, specially designed to cater to our younger attendees. With this ticket, kids can enjoy access to all event areas and engage in exciting activities tailored just for them, ensuring a memorable experience for the little ones.",
				cost: 5.99,
			},
			{
				name: "Regular",
				description:
					"Secure your spot at the heart of the event with our Regular Ticket, offering unrestricted access to all event attractions and performances. Immerse yourself in the festivities, indulge in delicious food options, and participate in various interactive activities for a day of entertainment and enjoyment.",
				cost: 9.99,
			},
			{
				name: "VIP",
				description:
					"Elevate your event experience with our VIP Ticket, granting exclusive perks and privileges. Enjoy expedited entry, access to VIP lounges with complimentary refreshments, and premium seating for main stage performances. Dive into luxury and convenience while relishing the event in style with our VIP Ticket.",
				cost: 19.99,
			},
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

	hashedPassword = await bcrypt.hash("Bob123456", 10);

	await prisma.account.create({
		data: {
			email: "bob@mail.com",
			password: hashedPassword,
			userId: 2,
		},
	});

	let fakeEvents: Prisma.EventCreateManyInput[] = [];
	let locations: Prisma.EventLocationCreateManyInput[] = [];

	for (let i = 1; i <= 10; i++) {
		fakeEvents.push({
			id: i,
			name: "Event " + i,
		});

		for (let j = 0; j <= 3; j++) {
			locations.push({
				eventId: i,
				name: faker.location.streetAddress(false),
			});
		}
	}

	await prisma.event.createMany({
		data: fakeEvents,
	});



	await prisma.eventLocation.createMany({
		data: locations,
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
