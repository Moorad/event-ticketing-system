import { prisma } from "../client";
import type { EventLocation, Prisma, TicketType } from "@prisma/client";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

async function main() {
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
	let ticketTypes: Prisma.TicketTypeCreateManyInput[] = [];

	// Available ticket types
	let images = [
		{
			thumbnail:
				"http://127.0.0.1:9000/event-thumbnails/76be0ba1-d332-47ce-8335-9908133b7268.png",
			logo: "http://127.0.0.1:9000/event-logos/05cf0ac7-f216-40dd-bb30-a5db8707854e.png",
		},
		{
			thumbnail:
				"http://127.0.0.1:9000/event-thumbnails/19bf95c3-28d5-40cf-877e-40fdd9860826.png",
			logo: "http://127.0.0.1:9000/event-logos/f6b5f97e-6854-461e-99fb-fa241d6add69.png",
		},
		{
			thumbnail:
				"http://127.0.0.1:9000/event-thumbnails/c56655d0-ea25-4031-8b46-2f616d28487a.png",

			logo: "http://127.0.0.1:9000/event-logos/75037db7-e934-4819-b403-d0077722fa6d.png",
		},
	];

	let eventNames = ["Formula One Race", "Diryah", "Wonder Garden"];

	for (let i = 0; i < 3; i++) {
		fakeEvents.push({
			name: eventNames[i],
			description: faker.lorem.paragraphs(4),
			thumbnail: images[i].thumbnail,
			logo: images[i].logo,
			startDate: faker.date.future(),
			isFeatured: true,
		});

		for (let j = 0; j < 3; j++) {
			locations.push({
				eventId: i + 1,
				name: faker.location.streetAddress(false),
			});
		}

		ticketTypes.push({
			eventId: i + 1,
			name: "Regular",
			description: faker.lorem.paragraphs(4),
			cost: faker.number.int({ min: 20, max: 200 }),
		});
		ticketTypes.push({
			eventId: i + 1,
			name: "Child",
			description: faker.lorem.paragraphs(4),
			cost: faker.number.int({ min: 20, max: 100 }),
		});

		ticketTypes.push({
			eventId: i + 1,
			name: eventNames[i] + " Premium",
			description: faker.lorem.paragraphs(4),
			cost: faker.number.int({ min: 200, max: 500 }),
		});
	}

	await prisma.event.createMany({
		data: fakeEvents,
	});

	await prisma.eventLocation.createMany({
		data: locations,
	});

	await prisma.ticketType.createMany({ data: ticketTypes });
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
