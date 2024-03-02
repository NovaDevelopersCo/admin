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
			? allCards.filter((i) => i.title.includes(title))
			: allCards;

		// .sort((a, b) =>
		// 		sortOrder === "ASC"
		// 			? a[sortField].localeCompare(b[sortField])
		// 			: b[sortField].localeCompare(a[sortField])
		// 	)

		const splicedCards = filteredByTitle.splice(+filterStart, +filterEnd);

		const formattedCards = splicedCards;

		return Array.isArray(formattedCards) ? formattedCards : [];
	}

	static async getMany(filter?: { ids: string[] }) {
		if (!filter) {
			return [];
		}

		const cards = await CardModel.find({ _id: { $in: filter.ids } });

		const formattedCards = cards;

		return Array.isArray(formattedCards) ? formattedCards : [];
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
		const { image, ...data } = card;

		const candidate = await CardModel.findById(id);

		if (!candidate) {
			throw ApiError.badRequest("Card not found");
		}

		Object.assign(candidate, data);

		if (image) {
			const imageUrl = await ImageService.upload(image, candidate._id);
			candidate.image = imageUrl;
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
