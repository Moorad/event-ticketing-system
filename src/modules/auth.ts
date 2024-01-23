// import { PrismaClient } from "@prisma/client";
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import { hashPassword } from "@/utils/crypto";
// import { timingSafeEqual } from "node:crypto";

// export function initialise() {
// 	const prisma = new PrismaClient();

// 	passport.use(
// 		new LocalStrategy(async (email, password, done) => {
// 			const account = await prisma.account.findUnique({
// 				where: {
// 					email: email,
// 				},
// 			});

// 			if (account == null) {
// 				return done(null, false, {
// 					message: "Incorrect username or password.",
// 				});
// 			}

// 			// Already a buffer (returned by pbkdf2)
// 			const hashedPassword = await hashPassword(password, "abc");

// 			console.log(hashedPassword);

// 			// https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b
// 			if (
// 				!timingSafeEqual(hashedPassword, Buffer.from(account.password))
// 			) {
// 				return done(null, false, {
// 					message: "Incorrect username or password.",
// 				});
// 			}

// 			return done(null, account);
// 		})
// 	);
// }
