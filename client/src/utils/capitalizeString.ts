export const capitalizeString = (str: string) => {
	if (str.length === 0) {
		return str;
	}

	const firstLetter = str.charAt(0).toUpperCase();
	const partOfString = str.slice(1);

	return firstLetter + partOfString;
};
