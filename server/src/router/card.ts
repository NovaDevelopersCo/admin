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
			.bail()
			.trim()
			.notEmpty()
			.withMessage("Name can't be only spaces")
			.bail()
			.isLength({ max: 50 })
			.withMessage("Name can't be longer, than 50 symbols")
			.bail()
			.matches(/^[a-zA-Z0-9*()\- а-яА-Я]+$/u)
			.withMessage("Name incorrect format"),
		body("price")
			.trim()
			.notEmpty()
			.withMessage("Price is required")
			.bail()
			.matches(/^\d+$/)
			.withMessage("Price must be an integer")
			.bail()
			.isInt({ min: 0, max: 9999 })
			.withMessage("Price can't be smaller, than 0, and bigger than 9999"),
		body("category").notEmpty().withMessage("Category is required"),
		body("count")
			.trim()
			.optional()
			.matches(/^\d+$/)
			.withMessage("Count must be an integer")
			.bail()
			.isInt({ min: 0, max: 9999 })
			.withMessage("Count can't be smaller, than 0, and bigger than 9999")
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
			.bail()
			.trim()
			.notEmpty()
			.withMessage("Name can't be only spaces")
			.bail()
			.isLength({ max: 50 })
			.withMessage("Name can't be longer, than 50 symbols")
			.matches(/^[a-zA-Z0-9*()\- а-яА-Я]+$/u)
			.withMessage("Name incorrect format"),
		body("price")
			.trim()
			.notEmpty()
			.withMessage("Price is required")
			.bail()
			.matches(/^\d+$/)
			.withMessage("Price must be an integer")
			.bail()
			.isInt({ min: 0, max: 9999 })
			.withMessage("Price can't be smaller, than 0, and bigger than 9999"),
		body("count")
			.trim()
			.matches(/^\d+$/)
			.withMessage("Count must be an integer")
			.bail()
			.isInt({ min: 0, max: 9999 })
			.withMessage("Count can't be smaller, than 0, and bigger than 9999")
	],
	CardController.update
);

export { cardRoutes };
