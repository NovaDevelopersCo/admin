import type { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/OrderService";
import { getValidationErrors } from "../utils/getValidationErrors";

export class OrderController {
	static async getList(req: Request, res: Response, next: NextFunction) {
		try {
			const { q, range, sort, filter } = req.query as {
				q: string;
				range: string;
				sort: string;
				filter: string;
			};

			const { items, total } = await OrderService.getList(
				q,
				range,
				sort,
				filter
			);

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

	static async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params as { id: string };

			const order = await OrderService.getOne(id);

			return res.json({ data: order });
		} catch (e) {
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
