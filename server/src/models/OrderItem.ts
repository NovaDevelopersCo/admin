import { model, Schema } from "mongoose";

import type { TOrderItem } from "../types";

const orderItem = new Schema<TOrderItem>({
	count: { type: String, required: true },
	card: { type: String, ref: "Card" }
});

export const OrderItemModel = model<TOrderItem>("OrderItem", orderItem);
