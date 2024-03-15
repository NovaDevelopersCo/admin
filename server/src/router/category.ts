import { Router } from "express";

import { body } from "express-validator";

import { CategoryController } from "../controllers/CategoryController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const categoriesRouter = Router();

categoriesRouter.get("/", CategoryController.getList);
categoriesRouter.get("/many", CategoryController.getMany);
categoriesRouter.get("/:id", CategoryController.getOne);
categoriesRouter.put(
	"/:id",
	[
		AuthMiddleware,
		// body("name")
		// 	.trim()
		// 	.notEmpty()
		// 	.withMessage("Name is required")
		// 	.isLength({ max: 50 })
		// 	.withMessage("Name can't be bigger, than 50 symbols")
		// 	.matches(/^[a-zA-Z0-9*()\- а-яА-Я]+$/u)
		// 	.withMessage("Name incorrect format"),
		body("description")
			.notEmpty()
			.withMessage("Description is required")
			.bail()
			.trim()
			.notEmpty()
			.withMessage("Description can't be only spaces")
			.bail()
			.isLength({ max: 3000 })
			.withMessage("Description can't be bigger, than 3000 symbols")
	],
	CategoryController.update
);

export { categoriesRouter };
