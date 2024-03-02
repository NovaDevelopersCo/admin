import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

import { CardService } from "../services/CardService";
import { TCard } from "../types";

export class CardController {
	static async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params as { id: string };

			if (!id) {
				throw ApiError.badRequest("Param id is empty");
			}

			const card = await CardService.getOne(id);

			return res.json({ card });
		} catch (e) {
			next(e);
		}
	}

	static async getList(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, range, sort } = req.query as {
				title: string;
				range: string;
				sort: ["price" | "description" | "title" | "count" | "id", string];
			};

			const cards = await CardService.getList(title, sort, range);

			return res.json({ cards, total: cards.length });
		} catch (e) {
			console.log(e);
			next(e);
		}
	}

	static async getMany(req: Request, res: Response, next: NextFunction) {
		try {
			const { filter } = req.query as { filter: { ids: string[] } };

			const cards = await CardService.getMany(filter);

			return res.json({ cards });
		} catch (e) {
			next(e);
		}
	}

	static async getManyReference(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
		} catch (e) {
			next(e);
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const fields = req.body as Omit<TCard, "_id">;

			const { title, image, description } = fields;

			if (!title || !image || !description) {
				throw ApiError.badRequest("Please, fill in all the fields");
			}

			const card = await CardService.create(fields);

			return res.json({ card });
		} catch (e) {
			console.log(e);
			next(e);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params as { id: string };

			if (!id) {
				throw ApiError.badRequest("Param id is empty");
			}

			const card = await CardService.delete(id);
		} catch (e) {
			next(e);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const fields = req.body as TCard & {
				isImageUpdated: boolean;
			};

			const { id } = req.params as { id: string };

			if (!id) {
				throw ApiError.badRequest("Param id is empty");
			}

			const { title, description } = fields;

			if (!title || !description) {
				throw ApiError.badRequest("Please, fill in all the fields");
			}

			const card = await CardService.update(fields, id);

			return res.json({ card });
		} catch (e) {
			console.log(e);
			next(e);
		}
	}
}
