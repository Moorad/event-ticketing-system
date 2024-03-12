export function extractTimeElements(date: Date) {
	return {
		year: date.getFullYear(),
		month: date.toLocaleString("default", { month: "short" }),
		day: date.getDay(),
		hour: date.getHours(),
		minute: date.getMinutes(),
	};
}

// Plain date like 15 March 2024
export function plainDate(date: Date) {
	return date.toLocaleString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}
