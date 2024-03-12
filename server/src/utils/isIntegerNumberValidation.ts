import { ApiError } from "./ApiError";

export const isIntegerNumberValidation = (num: string, key: string) => {
	if (String(num).includes(",")) {
		throw ApiError.badRequest(`${key} must be an integer number`);
	}

	if (!Number.isInteger(+num) && num) {
		throw ApiError.badRequest(`${key} must be an integer number`);
	}
};
