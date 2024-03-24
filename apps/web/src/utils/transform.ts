export function shuffle<T>(array: T[]) {
	return array
		.map((a) => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value);
}

export function updateObjectAt<T>(
	arr: T[],
	index: number,
	newObject: Partial<T>,
) {
	const item = arr[index];

	return [
		...arr.slice(0, index),
		{ ...item, ...newObject },
		...arr.slice(index + 1),
	];
}
