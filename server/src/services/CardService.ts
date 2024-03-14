import { CardModel } from "../models/Card";
import { ApiError } from "../utils/ApiError";
import type { TCard } from "../types";
import { CategoryModel } from "../models/Category";
import { Validation } from "../utils/Validation";

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

		if (!total) {
			total = items.length;
		}

		if (Number.isInteger(+filterStart) && Number.isInteger(+filterEnd)) {
			items = items.slice(+filterStart, +filterEnd + 1);
		}

		return {
			items,
			total
		};
	}

	static async create(
		card: Omit<TCard, "_id" | "orderCount"> & { [key: string]: string }
	) {
		const { name, count, category, price } = card;

		const candidate = await CardModel.findOne({ name });

		if (candidate) {
			throw ApiError.badRequest("Title is busy!");
		}

		const categoryCandidate = await CategoryModel.findById(category);

		if (!categoryCandidate) {
			throw ApiError.badRequest("Category not found");
		}

		const newCard = new CardModel({ name, category });

		const { options } = categoryCandidate;

		const cardFieldsArr = ["price", ...Object.keys(CardModel.schema.obj)];

		if (price) {
			Validation.isIntegerNumberValidation(price, "price");
			newCard.price = price;
		}

		if (count) {
			Validation.isIntegerNumberValidation(count, "count");
			newCard.count = count;
		}

		const optionsObj: { [key: string]: string } = {};

		options.map((o) => {
			if (cardFieldsArr.includes(o)) {
				// Validation.isIntegerNumberValidation(card[o], o); if need validation
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

		const previousData = candidate;

		const { deletedCount } = await CardModel.deleteOne({ _id: id });

		if (deletedCount == 0) {
			throw ApiError.badRequest("Error delete");
		}

		return previousData;
	}

	static async update(
		card: TCard & { [key: string]: any; previousData: TCard },
		id: string
	) {
		const candidate = await CardModel.findById(id);

		const { previousData, price, count, ...data } = card;

		if (!candidate) {
			throw ApiError.badRequest("Card not found");
		}

		const updatedCard: { [key: string]: string } = {
			...candidate.toObject(),
			...data
		};

		if (price) {
			Validation.isIntegerNumberValidation(price, "price");
			updatedCard.price = price;
		}

		if (count) {
			updatedCard.count = count;
			Validation.isIntegerNumberValidation(count, "count");
		}

		// change category change logic
		if (card.category !== card.previousData.category) {
			const previousCategory = await CategoryModel.findById(
				card.previousData.category
			);

			const actualCategory = await CategoryModel.findById(card.category);

			if (!previousCategory || !actualCategory) {
				throw ApiError.badRequest("Can't find category");
			}

			// clear old category properties into card
			previousCategory.options.map((o) => {
				updatedCard[o] = "";
			});

			// add new category properties to updated card
			actualCategory.options.map((o) => {
				if (Object.keys(card).includes(o)) {
					updatedCard[o] = card[o];
				}
			});
		}

		Object.assign(candidate, updatedCard);

		await candidate.save();

		return candidate;
	}

	static async deleteMany(unParsedIds: string) {
		const ids = JSON.parse(unParsedIds) as string[];

		const deleteCards = ids.map(async (id) => {
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
