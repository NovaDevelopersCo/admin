import { Schema, model } from "mongoose";

import type { TCategory } from "../types";

const category = new Schema<TCategory>({
	name: { type: String, unique: true, required: true },
	options: { type: [String], default: [] },
	image: { type: String, required: true },
	description: { type: String }
});

export const CategoryModel = model<TCategory>("Category", category);
