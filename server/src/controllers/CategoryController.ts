import { NextFunction, Request, Response } from "express";

import { CategoryService } from "../services/CategoryService";

import { ApiError } from "../utils/ApiError";

export class CategoryController {
	static async getList(req: Request, res: Response, next: NextFunction) {
		try {
			const { q, range, sort } = req.query as {
				q: string;
				range: string;
				sort: string;
			};

			const { items, total } = await CategoryService.getList(q, range, sort);

			return res.json({ data: items, total });
		} catch (e) {
			next(e);
		}
	}

	static async getMany(req: Request, res: Response, next: NextFunction) {
		try {
			const { filter } = req.query as { filter: { ids: string[] } };

			const cards = await CategoryService.getMany(filter);

			return res.json({ data: cards });
		} catch (e) {
			next(e);
		}
	}

	static async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params as { id: string };

			const category = await CategoryService.getOne(id);

			return res.json({ data: category });
		} catch (e) {
			next(e);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params as { id: string };

			const { description, image } = req.body as {
				image: string;
				description: string;
			};

			if (!id) {
				throw ApiError.badRequest("Param id is empty");
			}

			const category = await CategoryService.update({ description, image }, id);

			return res.json({ data: category });
		} catch (e) {
			next(e);
		}
	}
}
