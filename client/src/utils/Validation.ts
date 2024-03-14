import type { ValidationErrorMessage } from "react-admin";

export class Validation {
	constructor() {}

	static getReactAdminValidationError(str?: string) {
		// error format: @@react-admin@@{"message":"error","args":{"max":200}}
		return str ? JSON.parse(str?.split("@@react-admin@@")[1]) : {};
	}

	static isIntegerNumberValidation(num: number): ValidationErrorMessage | null {
		if (String(num).includes(",")) {
			return { message: "Not integer number", args: { isInteger: num } };
		}

		if (Number.isInteger(+num) || !num) {
			return null;
		}
		return { message: "Not integer number", args: { isInteger: num } };
	}

	static isStrNotOnlySpace(str: string) {
		if (str.trim().length > 0) {
			return null;
		}

		return {
			message: "You can't use only spaces",
			args: { isSpacesOnly: str }
		};
	}
}
