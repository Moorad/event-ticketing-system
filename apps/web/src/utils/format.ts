export function numberFormat(num: number, dp: number) {
	return Math.floor(num * 10 ** dp) / 10 ** dp;
}

export function formatTimeLeft(milliseconds: number) {
	const minutes = Math.floor(milliseconds / 1000 / 60) % 60;
	const hours = Math.floor(milliseconds / 1000 / 60 / 60);

	let formattedString = "";

	if (hours > 0) {
		formattedString += hours + "h";
	}

	if (minutes > 0 || (minutes <= 0 && hours <= 0)) {
		formattedString += minutes + "min";
	}

	return formattedString;
}

export function arrayToBulletPoints(str: string[]) {
	return str.reduce((acc, curr) => (acc += "\t• " + curr + "\n"), "");
}

export function naturalLanguageCombine(strs: string[]) {
	let sentence = "";
	for (let i = 0; i < strs.length; i++) {
		// Capitalise first character of the first sentence
		if (i == 0) {
			strs[i] = strs[i][0].toUpperCase() + strs[i].slice(1);
		}

		sentence += strs[i];

		// If not last sentence next, add a comma
		if (i < strs.length - 2) {
			sentence += ", ";
		}

		// If last sentence next and there is more than one sentence, add an 'and'
		if (i == strs.length - 2 && strs.length > 1) {
			sentence += " and ";
		}
	}

	return sentence;
}
