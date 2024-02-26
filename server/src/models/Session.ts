import { Schema, model } from "mongoose";

import type { TSession } from "../types";

const session = new Schema<TSession>({
	user: { type: String, ref: "User", unique: true, required: true },
	refreshToken: { type: String, unique: true, required: true }
});

export const SessionModel = model<TSession>("Session", session);
