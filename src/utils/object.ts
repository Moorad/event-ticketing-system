export function zerosObject<T>(keys: (keyof T)[]): { [k in keyof T]: number } {
	let obj: { [k in keyof T]: number } = {} as { [k in keyof T]: number };

	keys.forEach((key) => {
		obj[key] = 0;
	});

	return obj;
}
