import { CardModel } from "../models/Card";
import { ApiError } from "../utils/ApiError";
import type { TCard } from "../types";
import { ImageService } from "./ImageService";

export class CardService {
	static async getOne(id: string) {
		const card = await CardModel.findById(id);

		if (!card) {
			throw ApiError.badRequest("Card not found");
		}

		return card;
	}

	static async getList(
		unpArsedTitle: string,
		sort: ["price" | "description" | "title" | "count" | "id", string],
		range: string
	) {
		const [field, sortOrder] = sort;

		const title = unpArsedTitle ? JSON.parse(unpArsedTitle) : "";

		const sortField = field === "id" ? "_id" : field;

		const [filterStart, filterEnd] = JSON.parse(range);

		const allCards = await CardModel.find();

		const filteredByTitle = title
			? allCards.filter((i) => i.name.includes(title))
			: allCards;

		// .sort((a, b) =>
		// 		sortOrder === "ASC"
		// 			? a[sortField].localeCompare(b[sortField])
		// 			: b[sortField].localeCompare(a[sortField])
		// 	)

		const splicedCards = filteredByTitle.slice(+filterStart, +filterEnd + 1);

		return {
			cards: Array.isArray(splicedCards) ? splicedCards : [],
			total: filteredByTitle.length
		};
	}

	static async getMany(filter?: { ids: string[] }) {
		if (!filter || !filter.ids) {
			return [];
		}

		const cards = await CardModel.find({ _id: { $in: filter.ids } });

		return Array.isArray(cards) ? cards : [];
	}

	static async getManyReference() {}

	static async create(card: Omit<TCard, "_id">) {
		const candidate = await CardModel.findOne({ title: card.name });

		if (candidate) {
			throw ApiError.badRequest("Title is busy!");
		}

		const newCard = new CardModel({ ...card });

		await newCard.save();

		return newCard;
	}

	static async delete(id: string) {
		const candidate = await CardModel.findById(id);

		if (!candidate) {
			throw ApiError.badRequest("Card not found");
		}

		const { result } = await ImageService.remove(`alco/cards/${id}`);

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
			const { result } = await ImageService.remove(`alco/cards/${id}`);

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
}
