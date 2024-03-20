import { CardModel } from "../models/Card";
import { OrderModel } from "../models/Order";
import { ApiError } from "../utils/ApiError";
import { OrderItemModel } from "../models/OrderItem";

type TCreateBodyOrder = {
	card: string;
	count: string;
};

export class OrderService {
	static async getList(
		unParsedNumber: string,
		range: string,
		sort: string,
		unParsedFilter: string
	) {
		const [sortBy, sortOrder] = sort ? JSON.parse(sort) : [];

		const filter = unParsedFilter ? JSON.parse(unParsedFilter) : {};

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

		if (filter && filter.status) {
			items = items.filter((i) => i.status === filter.status);
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
		const { body: unparsedBody, description, ...dataOrder } = order;

		const orders = await OrderModel.find();

		let price = 0;

		const parsedBody = JSON.parse(unparsedBody);

		const body: TCreateBodyOrder[] =
			unparsedBody && Array.isArray(parsedBody) ? parsedBody : [];

		const formattedOrder: Map<string, string> = new Map();

		const newOrder = new OrderModel();

		if (description) {
			newOrder.description = description;
		}

		body.map((i) => {
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

		const orderItemsArr = [];

		for (let [key, value] of formattedOrder) {
			const card = await CardModel.findById(key);

			if (!card) {
				throw ApiError.badRequest("Card not found");
			}

			if (+value > +card.count) {
				throw ApiError.badRequest(`There are only 64 ${card.name} available`);
			}

			price += +value * +card.price;

			const newOrderItem = new OrderItemModel({ count: value, card: key });

			orderItemsArr.push(newOrderItem._id);

			await newOrderItem.save();
		}

		newOrder.number = String(orders.length + 1);

		Object.assign(newOrder, dataOrder);

		newOrder.body = orderItemsArr;
		newOrder.price = String(price);

		await newOrder.save();

		return { message: `Your order number: ${newOrder.number}` };
	}

	static async getOne(id: string) {
		const order = await OrderModel.findById(id).populate("body");

		if (!order) {
			throw ApiError.badRequest("Order not found");
		}

		return order;
	}

	static async getMany(filter: string) {
		if (!filter) {
			return [];
		}

		const parsedFilterObj = JSON.parse(filter);

		if (!parsedFilterObj.id) {
			return [];
		}

		const orders = await OrderModel.find({ _id: { $in: parsedFilterObj.id } });

		return orders;
	}

	static async delete(id: string) {
		const candidate = await OrderModel.findById(id);

		if (!candidate) {
			throw ApiError.badRequest("Order not found");
		}

		const { deletedCount: deletedOrderItemsCount } =
			await OrderItemModel.deleteMany({ _id: candidate.body });

		if (deletedOrderItemsCount !== candidate.body.length) {
			throw ApiError.badRequest("Error deleting order-items");
		}
		const previousData = candidate;

		const { deletedCount } = await OrderModel.deleteOne({ _id: id });

		if (deletedCount == 0) {
			throw ApiError.badRequest(`Can't delete order with id: ${id}`);
		}

		return previousData;
	}

	static async deleteMany(unParsedIds: string) {
		const ids = JSON.parse(unParsedIds) as string[];

		const deleteOrders = ids.map(async (orderId) => {
			const order = await OrderModel.findById(orderId);
			if (!order) {
				throw ApiError.badRequest(`Can't find order with id: ${orderId}`);
			}

			const { deletedCount: deletedOrderItemsCount } =
				await OrderItemModel.deleteMany({ _id: order.body });

			if (deletedOrderItemsCount !== order.body.length) {
				throw ApiError.badRequest("Can't delete order-items");
			}

			const { deletedCount } = await OrderModel.deleteOne({ _id: orderId });

			if (deletedCount == 0) {
				throw ApiError.badRequest(`Error delete order with id: ${orderId}`);
			}
		});

		await Promise.all(deleteOrders);

		return ids;
	}
}
