export const formatDescription = (str: string) => {
	let formattedStr = str.slice(0, 150);

	if (str.length > 150) {
		formattedStr += "...";
	}

	return formattedStr;
};
