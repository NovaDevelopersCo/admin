import type { ValidationErrorMessage } from "react-admin";

export const isIntegerNumberValidation = (
	num: number
): ValidationErrorMessage | null => {
	if (String(num).includes(",")) {
		return { message: "Not integer number", args: { isInteger: num } };
	}

	if (Number.isInteger(+num) || !num) {
		return null;
	}
	return { message: "Not integer number", args: { isInteger: num } };
};
