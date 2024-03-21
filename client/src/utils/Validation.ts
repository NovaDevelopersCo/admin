export class Validation {
	constructor() {}

	static getReactAdminValidationError(str?: string) {
		// error format: @@react-admin@@{"message":"error","args":{"max":200}}
		return str ? JSON.parse(str?.split("@@react-admin@@")[1]) : {};
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
