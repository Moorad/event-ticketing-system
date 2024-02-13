export function numberFormat(num: number, dp: number) {
	return Math.floor(num * 10 ** dp) / 10 ** dp;
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
