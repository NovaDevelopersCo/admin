import { ApiError } from "./ApiError";

// 😀

export class Validation {
	constructor() {}

	static isIntegerNumberValidation(
		num: string,
		key: string,
		isInt: boolean = true
	) {
		if (isInt) {
			if (!/^\d+$/.test(num)) {
				throw ApiError.badRequest(
					`${key} must be an integer number, bigger than 0`
				);
			}
		} else {
			if (!/^\d+(\.\d+)?$/.test(num)) {
				throw ApiError.badRequest(
					`${key} must be an integer number, bigger than 0`
				);
			}
		}
	}
}
