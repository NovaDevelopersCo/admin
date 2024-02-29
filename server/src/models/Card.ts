import { Schema, model } from "mongoose";

import type { TCard } from "../types";

const card = new Schema<TCard>({
	title: { type: String, required: true, unique: true },
	description: { type: String },
	price: { type: String, default: "0" },
	count: { type: String, default: "0" },
	image: { type: String, required: true }
});

export const CardModel = model<TCard>("Card", card);
