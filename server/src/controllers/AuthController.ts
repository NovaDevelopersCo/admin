import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { AuthService } from "../services/AuthService";
import { TokenService } from "../services/TokenService";
import { getValidationErrors } from "../utils/getValidationErrors";

export class AuthController {
	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationErrors(req);
			const { login, password } = req.body as {
				login: string;
				password: string;
			};

			const { accessToken, refreshToken } = await AuthService.login(
				login,
				password
			);

			res.cookie("refreshToken", refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
				path: "/api/auth"
			});

			return res.json({ accessToken });
		} catch (e) {
			next(e);
		}
	}

	static async registration(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationErrors(req);

			const { login, password } = req.body as {
				login: string;
				password: string;
			};

			await AuthService.registration(login, password);

			return res.json({ message: "ok" });
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

			res.clearCookie("refreshToken");

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
					.clearCookie("refreshToken")
					.json({ message: "You unauthorized" });
			};

			const { refreshToken: tokenFromCookie } = req.cookies as {
				refreshToken: string;
			};

			if (!tokenFromCookie) {
				return clearTokens();
			}

			const result = await TokenService.refresh(tokenFromCookie);

			if (!result) {
				return clearTokens();
			}

			const { accessToken, refreshToken } = result;

			res.cookie("refreshToken", refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
				path: "/api/auth"
			});

			return res.json({
				accessToken
			});
		} catch (e) {
			next(e);
		}
	}

	static async getProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req;

			if (!userId) {
				throw ApiError.unauthorized();
			}

			const profile = await AuthService.getProfile(userId);

			return res.json({ ...profile });
		} catch (e) {
			next(e);
		}
	}
}
