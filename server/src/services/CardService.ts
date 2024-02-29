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
		title: string,
		sort: ["price" | "description" | "title" | "count", string],
		range: [string, string]
	) {
		const [sortFields, sortOrder] = sort;

		const [filterStart, filterEnd] = range;

		const allCards = await CardModel.find();

		const filteredByTitle = allCards.filter((i) => i.title.includes(title));

		const sortedAndSplicedCards = filteredByTitle
			.sort((a, b) =>
				sortOrder === "ASC"
					? a[sortFields].localeCompare(b[sortFields])
					: b[sortFields].localeCompare(a[sortFields])
			)
			.splice(+filterStart, +filterEnd);

		return sortedAndSplicedCards;
	}

	static async getMany(filter?: { ids: string[] }) {
		if (!filter) {
			return [];
		}

		const cards = await CardModel.find({ _id: { $in: filter.ids } });
		return cards;
	}

	static async getManyReference() {}

	static async create(card: Omit<TCard, "_id">) {
		const candidate = await CardModel.findOne({ title: card.title });

		if (candidate) {
			throw ApiError.badRequest("Title is busy!");
		}

		const image = ImageService.upload(card.image, card.title);

		const newCard = new CardModel({ ...card, image });

		await newCard.save();

		return newCard;
	}

	static async delete(id: string) {
		const candidate = await CardModel.findById(id);

		if (!candidate) {
			throw ApiError.badRequest("Card not found");
		}

		const resultDeleteImage = await ImageService.remove(candidate.title);
	}
}
