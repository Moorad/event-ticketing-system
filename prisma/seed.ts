import { PrismaClient, Prisma } from "@prisma/client";

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
