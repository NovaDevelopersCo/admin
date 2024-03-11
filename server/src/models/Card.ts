import { Schema, model } from "mongoose";

import type { TCard } from "../types";

const card = new Schema<TCard>({
	name: { type: String, required: true, unique: true },
	price: { type: String, default: "0" },
	count: { type: String, default: "0" },
	diameter: { type: String },
	length: { type: String },
	width: { type: String },
	thickness: { type: String },
	size: { type: String },
	orderCount: { type: String, default: "0" },
	category: { type: String, ref: "Category", required: true }
});

export const CardModel = model<TCard>("Card", card);
