import type { Request } from "express";

import { validationResult } from "express-validator";

import { ApiError } from "./ApiError";

export const getValidationErrors = (req: Request) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		let errorMessage = "";
		errors.array().forEach((error) => (errorMessage += `${error.msg}. `));
		throw ApiError.badRequest(errorMessage);
	}
};
