export { default } from "next-auth/middleware";

export const config = {
	// All protected pages
	matcher: ["/wallet"],
};
