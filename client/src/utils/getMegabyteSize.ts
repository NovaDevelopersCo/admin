export const getMegabyteSize = (size: number, isString: boolean) => {
	let res: string = String(size / 1000000);

	if (isString) {
		res += "mb";
	}

	return res;
};
