import { CardModel } from "../models/Card";
import { ApiError } from "../utils/ApiError";
import type { TCard } from "../types";
import { ImageService } from "./ImageService";
import { formatObjWithId } from "../utils/formatObjWithId";

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
		sort: ["price" | "description" | "title" | "count" | "id", string],
		range: string
	) {
		const [field, sortOrder] = sort;

		const sortField = field === "id" ? "_id" : field;

		const [filterStart, filterEnd] = JSON.parse(range);

		const allCards = await CardModel.find();

		const filteredByTitle = title
			? allCards.filter((i) => i.title.includes(title))
			: allCards;

		// .sort((a, b) =>
		// 		sortOrder === "ASC"
		// 			? a[sortField].localeCompare(b[sortField])
		// 			: b[sortField].localeCompare(a[sortField])
		// 	)

		const splicedCards = filteredByTitle.splice(+filterStart, +filterEnd);

		return formatObjWithId(splicedCards);
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

		const newCard = new CardModel({ ...card });
		const image = await ImageService.upload(card.image, newCard._id);

		newCard.image = image;

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
