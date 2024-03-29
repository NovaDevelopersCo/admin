import { NextFunction, Request, Response } from "express";

import { CardService } from "../services/CardService";
import { TCard } from "../types";

import { getValidationErrors } from "../utils/getValidationErrors";

export class CardController {
	static async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationErrors(req);
			const { id } = req.params as { id: string };

			const card = await CardService.getOne(id);

			return res.json({ data: card });
		} catch (e) {
			next(e);
		}
	}

	static async getList(req: Request, res: Response, next: NextFunction) {
		try {
			const {
				q,
				range,
				sort,
				options: optionsData,
				full
			} = req.query as {
				q: string;
				range: string;
				sort: string;
				options: string;
				full?: string;
			};

			const { items, total, options } = await CardService.getList(
				q,
				range,
				sort,
				optionsData,
				full
			);

			return res.json({
				data: items,
				total,
				meta: {
					options
				}
			});
		} catch (e) {
			console.log(e);
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
			getValidationErrors(req);
			const { id } = req.params as { id: string };

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

			const card = await CardService.update(body, id);

			return res.json({ data: card });
		} catch (e) {
			next(e);
		}
	}

	static async deleteMany(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationErrors(req);
			const { ids } = req.params as { ids: string };

			const deletedIds = await CardService.deleteMany(ids);

			return res.json({ ids: deletedIds });
		} catch (e) {
			next(e);
		}
	}
}
