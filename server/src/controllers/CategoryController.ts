import { NextFunction, Request, Response } from "express";

import { CategoryService } from "../services/CategoryService";

export class CategoryController {
	static async getList(req: Request, res: Response, next: NextFunction) {
		try {
			const categories = await CategoryService.getList();
			return res.json({ data: categories });
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
}
