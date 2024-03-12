import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

import { CardService } from "../services/CardService";
import { TCard } from "../types";

import { getValidationErrors } from "../utils/getValidationErrors";

export class CardController {
	static async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params as { id: string };

			if (!id) {
				throw ApiError.badRequest("Param id is empty");
			}

			const card = await CardService.getOne(id);

			return res.json({ data: card });
		} catch (e) {
			next(e);
		}
	}

	static async getList(req: Request, res: Response, next: NextFunction) {
		try {
			const { q, range, sort } = req.query as {
				q: string;
				range: string;
				sort: string;
			};

			const { items, total } = await CardService.getList(q, range, sort);

			return res.json({
				data: items,
				total
			});
		} catch (e) {
			next(e);
		}
	}

	static async getMany(req: Request, res: Response, next: NextFunction) {
		try {
			const { filter } = req.query as { filter: string };

			const cards = await CardService.getMany(filter);

			return res.json({ data: cards });
		} catch (e) {
			next(e);
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationErrors(req);

			const fields = req.body as Omit<TCard, "_id">;

			const card = await CardService.create(fields);

			return res.json({ data: card });
		} catch (e) {
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

			return res.json({ data: card });
		} catch (e) {
			next(e);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationErrors(req);

			const body = req.body as TCard & {
				previousData: TCard;
			};

			const { id } = req.params as { id: string };

			if (!id) {
				throw ApiError.badRequest("Param id is empty");
			}

			if (!body.name) {
				throw ApiError.badRequest("Please, fill in all the fields");
			}

			const card = await CardService.update(body, id);

			return res.json({ data: card });
		} catch (e) {
			next(e);
		}
	}

	static async deleteMany(req: Request, res: Response, next: NextFunction) {
		try {
			const { ids } = req.params as { ids: string };

			if (!ids) {
				throw ApiError.badRequest("Ids is empty");
			}

			const deletedIds = await CardService.deleteMany(ids);

			return res.json({ ids: deletedIds });
		} catch (e) {
			next(e);
		}
	}
}
