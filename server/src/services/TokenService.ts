import jwt from "jsonwebtoken";

import { UserDto } from "../dtos/UserDto";
import { UserModel } from "../models/User";
import { SessionModel } from "../models/Session";

export class TokenService {
	static generateTokens(user: UserDto) {
		const accessToken = jwt.sign(
			{ user },
			process.env.JWT_ACCESS_SECRET || "",
			{
				expiresIn: "5m"
			}
		);

		const refreshToken = jwt.sign(
			{ user },
			process.env.JWT_REFRESH_SECRET || "",
			{
				expiresIn: "30d"
			}
		);

		return { accessToken, refreshToken };
	}

	static async validateAccessToken(token: string) {
		try {
			const { user } = jwt.verify(
				token,
				process.env.JWT_ACCESS_SECRET || ""
			) as { user: UserDto };

			return user._id;
		} catch (e) {
			return null;
		}
	}

	static async validateRefreshToken(token: string) {
		try {
			const { user } = jwt.verify(
				token,
				process.env.JWT_REFRESH_SECRET || ""
			) as { user: UserDto };

			return user._id;
		} catch (e) {
			return null;
		}
	}

	static async saveToken(refreshToken: string, userId: string) {
		const session = await SessionModel.findOne({ user: userId });

		if (session) {
			session.refreshToken = refreshToken;
			return session.save();
		}

		const newSession = new SessionModel({
			user: userId,
			refreshToken
		});

		return newSession.save();
	}

	static async refresh(token: string) {
		const userId = await this.validateRefreshToken(token);
		const tokenFromDb = await SessionModel.findOne({ refreshToken: token });

		if (!userId || !tokenFromDb) {
			return null;
		}

		const user = await UserModel.findById(userId);

		if (!user) {
			return null;
		}

		const userDto = new UserDto(user);

		const tokens = TokenService.generateTokens(userDto);

		await this.saveToken(tokens.refreshToken, user._id);

		return tokens;
	}
}
