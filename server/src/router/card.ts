import { Router } from "express";

import { CardController } from "../controllers/CardController";

import { body } from "express-validator";

const cardRoutes = Router();

import { AuthMiddleware } from "../middlewares/AuthMiddleware";

cardRoutes.get("/:id", CardController.getOne);
cardRoutes.get("/", CardController.getList);
cardRoutes.get("/many", CardController.getMany);
cardRoutes.post(
	"/",
	[
		AuthMiddleware,
		body("title")
			.isLength({ max: 50 })
			.withMessage(`Title can't be longer, than 50 symbols`),
		body("price")
			.isInt({ min: 0, max: 9999 })
			.withMessage(`Price can't be smaller, than 0, and bigger than 9999`),
		body("count")
			.isInt({ min: 0, max: 9999 })
			.withMessage(`Price can't be smaller, than 0, and bigger than 9999`)
	],
	CardController.create
);
cardRoutes.delete("/:id", AuthMiddleware, CardController.delete);
cardRoutes.delete("/many/:ids", AuthMiddleware, CardController.deleteMany);
cardRoutes.put(
	"/:id",
	[
		AuthMiddleware,
		body("title")
			.isLength({ max: 50 })
			.withMessage(`Title can't be longer, than 50 symbols`),
		body("price")
			.isInt({ min: 0, max: 9999 })
			.withMessage(`Price can't be smaller, than 0, and bigger than 9999`),
		body("count")
			.isInt({ min: 0, max: 9999 })
			.withMessage(`Price can't be smaller, than 0, and bigger than 9999`)
	],
	CardController.update
);

export { cardRoutes };
