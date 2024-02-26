import { Schema, model } from "mongoose";

import type { TUser } from "../types";

const user = new Schema<TUser>({
	login: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

export const UserModel = model("User", user);
