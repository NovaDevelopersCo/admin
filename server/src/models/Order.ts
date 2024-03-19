import { model, Schema } from "mongoose";

import type { TOrder } from "../types";

const order = new Schema<TOrder>({
	description: { type: String },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	name: { type: String, required: true },
	body: [{ type: String, ref: "OrderItem", required: true }],
	status: { type: String, enum: ["ready", "waiting"], default: "waiting" },
	number: { type: String, required: true },
	price: { type: String, required: true }
});

export const OrderModel = model<TOrder>("Order", order);
