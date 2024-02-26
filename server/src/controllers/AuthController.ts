import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { AuthService } from "../services/AuthService";
import { TokenService } from "../services/TokenService";

export class AuthController {
	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { login, password } = req.body as {
				login: string;
				password: string;
			};

			if (!login || !password) {
				return ApiError.badRequest("Please, fill in all the fields");
			}

			const { tokens, user } = await AuthService.login(login, password);

			res.cookie("accessToken", tokens.accessToken, {
				maxAge: 1000 * 60 * 15
			});

			res.cookie("refreshToken", tokens.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true
			});

			return res.json({ ...user });
		} catch (e) {
			next(e);
		}
	}

	static async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const { login, password } = req.body as {
				login: string;
				password: string;
			};

			if (!login || !password) {
				return ApiError.badRequest("Please, fill in all the fields");
			}

			const { tokens, user } = await AuthService.registration(login, password);

			res.cookie("accessToken", tokens.accessToken, {
				maxAge: 1000 * 60 * 15
			});

			res.cookie("refreshToken", tokens.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true
			});

			return res.json({ ...user });
		} catch (e) {
			next(e);
		}
	}

	static async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies as { refreshToken: string };

			if (!refreshToken) {
				throw ApiError.unauthorized();
			}

			const result = await AuthService.logout(refreshToken);

			if (!result) {
				throw ApiError.unauthorized();
			}

			res.clearCookie("accessToken").clearCookie("refreshToken");

			return res.json({ message: result });
		} catch (e) {
			next(e);
		}
	}

	static async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const clearTokens = () => {
				return res
					.status(401)
					.clearCookie("accessToken")
					.clearCookie("refreshToken")
					.json({ message: "You unauthorized" });
			};

			const { refreshToken } = req.cookies as { refreshToken: string };

			if (!refreshToken) {
				return clearTokens();
			}

			const result = await TokenService.refresh(refreshToken);

			if (!result) {
				return clearTokens();
			}

			res.cookie("accessToken", result.tokens.accessToken, {
				maxAge: 1000 * 60 * 15
			});

			res.cookie("refreshToken", result.tokens.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true
			});

			return res.json({ ...result.user });
		} catch (e) {
			next(e);
		}
	}
}
