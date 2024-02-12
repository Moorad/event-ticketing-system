import { PrismaClient } from "@prisma/client";

// Create function to instantiate a prisma client (will ever be called once only)
const prismaClientSingleton = () => new PrismaClient();

// Change global object type to have propery prisma
declare global {
	var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// let the var prisma be the already instantiated prisma client stored in global object or call prismaClientSingleton create a new prisma client
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Expose prisma var
export default prisma;

// Lastly set global object prisma to prisma var
// In production environment we do not want to expose the prisma client in the global object to avoid the client being exposed global and potentially posing a security risk.
if (process.env.NODE_ENV !== "production") {
	globalThis.prisma = prisma;
}
