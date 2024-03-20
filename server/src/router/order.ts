import { Router } from "express";

import { OrderController } from "../controllers/OrderController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

import { body, param } from "express-validator";

const orderRoutes = Router();

orderRoutes.get("/", AuthMiddleware, OrderController.getList);
orderRoutes.get(
	"/:id",
	[AuthMiddleware, param("id").notEmpty().withMessage("Param id is empty")],
	OrderController.getOne
);
orderRoutes.post(
	"/",
	[
		body("description")
			.trim()
			.optional()
			.isLength({ min: 0, max: 500 })
			.withMessage(
				"Message can't be shorter, than 0, and longer, than 500 symbols"
			),
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
			.matches(/^[а-яА-я ]+$/)
			.withMessage("Incorrect name format"),
		body("email")
			.notEmpty()
			.withMessage("Email is required")
			.bail()
			.trim()
			.notEmpty()
			.withMessage("Email can't be only spaces")
			.bail()
			.isLength({ max: 50 })
			.withMessage("Email can't be longer, than 50 symbols")
			.bail()
			.matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)
			.withMessage("Incorrect email format"),
		body("phone")
			.notEmpty()
			.withMessage("Phone is required")
			.bail()
			.trim()
			.notEmpty()
			.withMessage("Phone can't be only spaces")
			.bail()
			.isLength({ max: 12 })
			.withMessage("Phone can't be longer, than 12 symbols")
			.bail()
			.matches(/^\+[0-9]+$/i)
			.withMessage("Phone incorrect format"),
		body("body").trim().notEmpty().withMessage("Body is required")
	],
	OrderController.create
);

export { orderRoutes };
