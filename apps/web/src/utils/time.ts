export function extractTimeElements(date: Date) {
	return {
		year: date.getFullYear(),
		month: date.toLocaleString("default", { month: "short" }),
		day: date.getDay(),
		hour: date.getHours(),
		minute: date.getMinutes(),
	};
}
