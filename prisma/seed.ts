import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
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

	await prisma.user.create({
		data: {
			full_name: "Moorad",
		},
	});

	const hashedPassword = await bcrypt.hash("Moorad123", 10);

	await prisma.account.create({
		data: {
			email: "moorad@mail.com",
			password: hashedPassword,
			user_id: 1,
			role: "User",
		},
	});

	await prisma.ticketType.createMany({
		data: [
			{ type: "Regular", cost: 9.99 },
			{ type: "VIP", cost: 19.99 },
			{ type: "Children", cost: 5.99 },
		],
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
