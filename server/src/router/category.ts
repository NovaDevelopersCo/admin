import { Router } from "express";

import { body, param } from "express-validator";

import { CategoryController } from "../controllers/CategoryController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const categoriesRouter = Router();

categoriesRouter.get("/", CategoryController.getList);
categoriesRouter.get("/many", CategoryController.getMany);
categoriesRouter.get(
	"/:id",
	[param("id").notEmpty().withMessage("Param id is empty")],
	CategoryController.getOne
);
categoriesRouter.put(
	"/:id",
	[
		AuthMiddleware,
		param("id").notEmpty().withMessage("Param id is empty"),
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
