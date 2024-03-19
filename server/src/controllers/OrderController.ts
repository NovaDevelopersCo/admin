import type { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/OrderService";
import { getValidationErrors } from "../utils/getValidationErrors";

export class OrderController {
	static async getList(req: Request, res: Response, next: NextFunction) {
		try {
			const { q, range, sort } = req.query as {
				q: string;
				range: string;
				sort: string;
			};

			const { items, total } = await OrderService.getList(q, range, sort);

			return res.json({ data: items, total });
		} catch (e) {
			next(e);
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationErrors(req);

			const { message } = await OrderService.create(req.body);

			return res.json({ message });
		} catch (e) {
			console.log(e);
			next(e);
		}
	}

	static async getStatistic(req: Request, res: Response, next: NextFunction) {
		try {
		} catch (e) {
			next(e);
		}
	}
}
