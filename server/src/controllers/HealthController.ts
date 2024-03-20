import type { NextFunction, Request, Response } from "express";

export class HealthController {
	static async check(req: Request, res: Response, next: NextFunction) {
		res.json({ message: "Api is ok!" });
	}
}
