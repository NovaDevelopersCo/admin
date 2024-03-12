import { Router } from "express";

import { CardController } from "../controllers/CardController";

import { body } from "express-validator";

const cardRoutes = Router();

import { AuthMiddleware } from "../middlewares/AuthMiddleware";

cardRoutes.get("/many", CardController.getMany);
cardRoutes.get("/:id", CardController.getOne);
cardRoutes.get("/", CardController.getList);
cardRoutes.post(
	"/",
	[
		AuthMiddleware,
		body("name")
			.notEmpty()
			.withMessage("Name is required")
			.isLength({ max: 50 })
			.withMessage("Name can't be longer, than 50 symbols")
			.matches(/^[a-zA-Z0-9*()\- ]+$/)
			.withMessage("Incorrect format"),
		body("price")
			.notEmpty()
			.withMessage("Price is required")
			.isInt({ min: 0, max: 9999 })
			.withMessage("Price can't be smaller, than 0, and bigger than 9999"),
		body("category").notEmpty().withMessage("Category is required")
	],
	CardController.create
);
cardRoutes.delete("/:id", AuthMiddleware, CardController.delete);
cardRoutes.delete("/many/:ids", AuthMiddleware, CardController.deleteMany);
cardRoutes.put(
	"/:id",
	[
		AuthMiddleware,
		body("name")
			.notEmpty()
			.withMessage("Name is required")
			.isLength({ max: 50 })
			.withMessage("Name can't be longer, than 50 symbols")
			.matches(/^[a-zA-Z0-9*()\- ]+$/)
			.withMessage("Incorrect format"),
		body("price")
			.notEmpty()
			.withMessage("Price is required")
			.isInt({ min: 0, max: 9999 })
			.withMessage("Price can't be smaller, than 0, and bigger than 9999"),
		body("count")
			.isInt({ min: 0, max: 9999 })
			.withMessage("Price can't be smaller, than 0, and bigger than 9999")
	],
	CardController.update
);

export { cardRoutes };
