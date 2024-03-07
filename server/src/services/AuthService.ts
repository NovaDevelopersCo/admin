import { UserModel } from "../models/User";

import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError";

import { TokenService } from "./TokenService";
import { UserDto } from "../dtos/UserDto";
import { SessionModel } from "../models/Session";

import { CategoryModel } from "../models/Category";

export class AuthService {
	static async login(login: string, password: string) {
		const user = await UserModel.findOne({ login });

		if (!user) {
			throw ApiError.badRequest("User not found");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw ApiError.unauthorized();
		}

		const userDto = new UserDto(user);

		const tokens = TokenService.generateTokens(userDto);

		await TokenService.saveToken(tokens.refreshToken, user._id);

		return { ...tokens };
	}

	static async registration(login: string, password: string) {
		const users = await UserModel.find();

		if (users.length > 0) {
			throw ApiError.badRequest(`Can't registration more users`);
		}

		const hashPassword = await bcrypt.hash(password, 7);

		const newUser = new UserModel({ login, password: hashPassword });

		await newUser.save();
	}

	static async logout(refreshToken: string) {
		const result = await SessionModel.deleteOne({ refreshToken });
		return result.deletedCount > 0;
	}

	static async getProfile(userId: string) {
		const profile = await UserModel.findById(userId);

		if (!profile) {
			throw ApiError.unauthorized();
		}

		const profileDto = new UserDto(profile);

		return profileDto;
	}
}
