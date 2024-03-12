import { CardModel } from "../models/Card";
import { ApiError } from "../utils/ApiError";
import type { TCard } from "../types";
import { ImageService } from "./ImageService";
import { CategoryModel } from "../models/Category";
import { isIntegerNumberValidation } from "../utils/isIntegerNumberValidation";

export class CardService {
	static async getOne(id: string) {
		const card = await CardModel.findById(id);

		if (!card) {
			throw ApiError.badRequest("Card not found");
		}

		return card;
	}

	static async getList(unParsedTitle: string, range: string, sort: string) {
		const [sortBy, sortOrder] = sort ? JSON.parse(sort) : [];

		const q: string = unParsedTitle ? JSON.parse(unParsedTitle) : "";

		const [filterStart, filterEnd] = range ? JSON.parse(range) : [];

		let items = await CardModel.find();
		let total;

		if (q) {
			items = items.filter((i) =>
				i.name.toLowerCase().includes(q.toLowerCase())
			);
			total = items.length;
		}

		if (sortBy === "price" || sortBy === "orderCount" || sortBy === "count") {
			if (sortOrder === "ASC") {
				items = [...items].sort((a, b) => a.get(sortBy) - b.get(sortBy));
			}

			if (sortOrder === "DESC") {
				items = [...items].sort((a, b) => b.get(sortBy) - a.get(sortBy));
			}
		}

		if (sortBy === "name") {
			if (sortOrder === "ASC") {
				items = [...items].sort((a, b) => a.name.localeCompare(b.name));
			}

			if (sortOrder === "DESC") {
				items = [...items].sort((a, b) => b.name.localeCompare(a.name));
			}
		}

		if (filterStart && filterEnd) {
			items = items.slice(+filterStart, +filterEnd + 1);
		}

		return {
			items,
			total: total ?? items.length
		};
	}

	static async create(
		card: Omit<TCard, "_id" | "orderCount"> & { [key: string]: string }
	) {
		const { price, name, count, category } = card;

		const candidate = await CardModel.findOne({ name });

		if (candidate) {
			throw ApiError.badRequest("Title is busy!");
		}

		const categoryCandidate = await CategoryModel.findById(category);

		if (!categoryCandidate) {
			throw ApiError.badRequest("Category not found");
		}

		const newCard = new CardModel({ price, name, count, category });

		const { options } = categoryCandidate;

		const cardFieldsArr = Object.keys(CardModel.schema.obj);

		const optionsObj: { [key: string]: string } = {};

		options.map((o) => {
			if (cardFieldsArr.includes(o)) {
				isIntegerNumberValidation(card[o], o);
				optionsObj[o] = card[o];
			}
		});

		Object.assign(newCard, optionsObj);

		await newCard.save();

		return newCard;
	}

	static async delete(id: string) {
		const candidate = await CardModel.findById(id);

		if (!candidate) {
			throw ApiError.badRequest("Card not found");
		}

		const { result } = await ImageService.remove(`metall/cards/${id}`);

		if (result !== "ok") {
			throw ApiError.badRequest(result);
		}

		const previousData = candidate;

		const { deletedCount } = await CardModel.deleteOne({ _id: id });

		if (deletedCount == 0) {
			throw ApiError.badRequest("Error delete");
		}

		return previousData;
	}

	static async update(card: TCard, id: string) {
		const candidate = await CardModel.findById(id);

		if (!candidate) {
			throw ApiError.badRequest("Card not found");
		}

		await candidate.save();

		return candidate;
	}

	static async deleteMany(unParsedIds: string) {
		const ids = JSON.parse(unParsedIds) as string[];

		const deleteCards = ids.map(async (id) => {
			const { result } = await ImageService.remove(`metall/cards/${id}`);

			if (result !== "ok") {
				throw ApiError.badRequest(`delete image ${id}: ${result}`);
			}

			const { deletedCount } = await CardModel.deleteOne({ _id: id });

			if (deletedCount == 0) {
				throw ApiError.badRequest("Error delete");
			}
		});

		await Promise.all(deleteCards);

		return ids;
	}

	static async getMany(filter: string) {
		if (!filter) {
			return [];
		}

		const parsedFilterObj = JSON.parse(filter);

		if (!parsedFilterObj.id) {
			return [];
		}

		const cards = await CardModel.find({ _id: { $in: parsedFilterObj.id } });

		return cards;
	}

	static async order() {}
}
