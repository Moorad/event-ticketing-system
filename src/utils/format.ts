export function numberFormat(num: number, dp: number) {
	return Math.floor(num * 10 ** dp) / 10 ** dp;
}
