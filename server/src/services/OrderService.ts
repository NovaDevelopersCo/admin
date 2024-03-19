import { OrderModel } from "../models/Order";
import { ApiError } from "../utils/ApiError";

type TCreateBodyOrder = {
	card: string;
	count: string;
};

export class OrderService {
	static async getList(unParsedNumber: string, range: string, sort: string) {
		const [sortBy, sortOrder] = sort ? JSON.parse(sort) : [];

		const q: string = unParsedNumber ? JSON.parse(unParsedNumber) : "";

		const [filterStart, filterEnd] = range ? JSON.parse(range) : [];

		let items = await OrderModel.find();

		let total;

		if (q) {
			items = items.filter((i) =>
				i.number.toLowerCase().includes(q.toLowerCase())
			);
			total = items.length;
		}

		if (!total) {
			total = items.length;
		}

		if (Number.isInteger(+filterStart) && Number.isInteger(+filterEnd)) {
			items = items.slice(+filterStart, +filterEnd + 1);
		}

		if (sortBy === "number") {
			if (sortOrder === "ASC") {
				items = items.sort((a, b) => a.number.localeCompare(b.number));
			}

			if (sortOrder === "DESC") {
				items = items.sort((a, b) => b.number.localeCompare(a.number));
			}
		}

		return {
			items,
			total
		};
	}

	static async create(order: {
		description?: string;
		email: string;
		phone: string;
		name: string;
		body: string;
	}) {
		const { body, description } = order;

		console.log(body);

		const parsedBody: TCreateBodyOrder[] = body ? JSON.parse(body) : [];

		let price = 0;

		const formattedOrder: Map<string, string> = new Map();

		const newOrder = new OrderModel();

		if (description) {
			newOrder.description = description;
		}

		parsedBody.map((i) => {
			if (
				!Object.keys(i).includes("card") ||
				!Object.keys(i).includes("count")
			) {
				throw ApiError.badRequest("Incorrect body format");
			}

			const orderCount = formattedOrder.get(i.card);

			formattedOrder.set(
				i.card,
				orderCount
					? String(parseFloat(orderCount) + parseFloat(i.count))
					: i.count
			);
		});
	}
}
