import { CardModel } from "../models/Card";
import { ApiError } from "../utils/ApiError";
import type { TCard, TCategory } from "../types";
import { CategoryModel } from "../models/Category";
import { Validation } from "../utils/Validation";
import { CardDto } from "../dtos/CardDto";

type TGetListOption = {
	[key: string]: string;
};

export class CardService {
	static async getOne(id: string) {
		const card = await CardModel.findById(id);

		if (!card) {
			throw ApiError.badRequest("Card not found");
		}

		const cardDto = new CardDto(card);

		return cardDto;
	}

	static async getList(
		unParsedTitle: string,
		range: string,
		sort: string,
		optionsData: string,
		full?: string
	) {
		let parsedSort: string[] = [];
		let parsedFilter: string[] = [];
		let q = "";
		let parsedOptions: TGetListOption[] = [];

		try {
			if (sort) {
				parsedSort = JSON.parse(sort);
			}
			if (range) {
				parsedFilter = JSON.parse(range);
			}
			if (unParsedTitle) {
				q = JSON.parse(unParsedTitle);
			}
			if (optionsData) {
				parsedOptions = JSON.parse(optionsData);
			}
		} catch (e) {
			throw ApiError.badRequest("Can't parse query params");
		}

		const [sortBy, sortOrder] = parsedSort;
		const [filterStart, filterEnd] = parsedFilter;

		let items;

		if (parsedOptions.length > 0) {
			items = await CardModel.find({ $or: parsedOptions }).populate("category");
		} else {
			items = await CardModel.find().populate("category");
		}

		let total;

		if (q) {
			items = items.filter((i) =>
				i.name.toLowerCase().includes(q.toLowerCase())
			);
			total = items.length;
		}

		if (!total) {
			total = items.length;
		}

		const optionsMap: Map<string, string[]> = new Map();

		items.map((i) => {
			// @ts-ignore
			const options: string[] = i.category.options;
			options.map((o) => {
				const value = i.get(o);
				if (value) {
					const optionValues = optionsMap.get(o);
					optionsMap.set(o, optionValues ? [...optionValues, value] : [value]);
				}
			});
		});

		const options: { [key: string]: string[] } = {};

		for (let [key, value] of optionsMap) {
			options[key] = value;
		}

		if (sortBy === "price" || sortBy === "orderCount" || sortBy === "count") {
			if (sortOrder === "ASC") {
				items = [...items].sort((a, b) => +a.get(sortBy) - +b.get(sortBy));
			}

			if (sortOrder === "DESC") {
				items = [...items].sort((a, b) => +b.get(sortBy) - +a.get(sortBy));
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

		if (Number.isInteger(+filterStart) && Number.isInteger(+filterEnd)) {
			items = items.slice(+filterStart, +filterEnd + 1);
		}

		const itemsDto = items.map((i) => new CardDto(i, full));

		return {
			items: itemsDto,
			total,
			options
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

		if (price) {
			if (price.includes(" ")) {
				throw ApiError.badRequest("Can't use spaces in price");
			}
			Validation.isIntegerNumberValidation(price, "price");
			newCard.price = price;
		}

		if (count) {
			if (count.includes(" ")) {
				throw ApiError.badRequest("Can't use spaces in count");
			}
			Validation.isIntegerNumberValidation(count, "count");
			newCard.count = count;
		}

		const { options } = categoryCandidate;

		const cardFieldsArr = ["price", ...Object.keys(CardModel.schema.obj)];

		const optionsObj: { [key: string]: string } = {};

		const cardKeys = Object.keys(card);

		options.map((o: string) => {
			if (cardFieldsArr.includes(o) && cardKeys.includes(o)) {
				// Validation.isIntegerNumberValidation(card[o].trim(), o, false);
				if (card[o].trim().length > 20) {
					throw ApiError.badRequest(`${o} can't be bigger, than 20 symbols`);
				}
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
			if (price.includes(" ")) {
				throw ApiError.badRequest("Can't use spaces in price");
			}
			Validation.isIntegerNumberValidation(price, "price");
			updatedCard.price = price;
		}

		if (count) {
			if (count.includes(" ")) {
				throw ApiError.badRequest("Can't use spaces here in count");
			}
			updatedCard.count = count;
			Validation.isIntegerNumberValidation(count, "count");
		}

		const category = await CategoryModel.findById(card.previousData.category);

		if (!category) {
			throw ApiError.badRequest("Can't find category");
		}

		const validateFieldsAndAssignToCard = (category: TCategory) => {
			const cardKeys = Object.keys(card);

			category.options.map((o: string) => {
				if (cardKeys.includes(o)) {
					// Validation.isIntegerNumberValidation(card[o].trim(), o, false);
					if (card[o].trim().length > 20) {
						throw ApiError.badRequest(`${o} can't be bigger, than 20 symbols`);
					}
					updatedCard[o] = card[o];
				}
			});
		};

		// change category change logic
		if (card.category !== card.previousData.category) {
			const actualCategory = await CategoryModel.findById(card.category);

			if (!actualCategory) {
				throw ApiError.badRequest("Can't find category");
			}

			// clear old category properties into card
			category.options.map((o) => {
				updatedCard[o] = "";
			});

			// add new category properties to updated card
			validateFieldsAndAssignToCard(actualCategory);
		} else {
			validateFieldsAndAssignToCard(category);
		}

		Object.assign(candidate, updatedCard);

		await candidate.save();

		const candidateDto = new CardDto(candidate);

		return candidateDto;
	}

	static async deleteMany(unParsedIds: string) {
		let ids: string[] = [];

		try {
			ids = JSON.parse(unParsedIds);
		} catch (e) {
			throw ApiError.badRequest("Can't parse query params");
		}

		const { deletedCount } = await CardModel.deleteMany({ _id: ids });

		if (deletedCount !== ids.length) {
			throw ApiError.badRequest("Error deleting cards");
		}

		return ids;
	}

	static async getMany(filter: string) {
		if (!filter) {
			return [];
		}

		let parsedFilterObj;

		try {
			parsedFilterObj = JSON.parse(filter);
		} catch (e) {
			throw ApiError.badRequest("Can't parse query params");
		}

		if (!parsedFilterObj.id) {
			return [];
		}

		const cards = await CardModel.find({ _id: { $in: parsedFilterObj.id } });

		const cardsDto = cards.map((i) => new CardDto(i, "full"));

		return cardsDto;
	}
}
