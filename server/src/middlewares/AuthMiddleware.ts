import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { TokenService } from "../services/TokenService";

export const AuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authorizationHeaders = req.headers.authorization;

		if (!authorizationHeaders) {
			throw ApiError.unauthorized();
		}

		const token = authorizationHeaders?.split(" ")[1];

		if (!token) {
			throw ApiError.unauthorized();
		}

		const userId = await TokenService.validateAccessToken(token);

		if (!userId) {
			throw ApiError.unauthorized();
		}

		req.userId = userId;

		next();
	} catch (e) {
		return next(ApiError.unauthorized());
	}
};
