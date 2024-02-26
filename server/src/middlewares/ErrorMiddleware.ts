import type { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/ApiError";

export const errorMiddleware = (
	err: ApiError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.text });
	}

	return res.status(500).json({ message: "Unexpected error" });
};
