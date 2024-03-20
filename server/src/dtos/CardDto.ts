import type { TCard } from "../types";

export class CardDto {
	constructor() {}

	static get(model: TCard) {
		const { orderCount, ...data } = model;
		return data;
	}
}
