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
		body("name")
			.notEmpty()
			.withMessage("Name is required")
			.isLength({ max: 50 })
			.withMessage("Name can't be bigger, than 50 symbols")
			.matches(/^[a-zA-Z0-9*()\- ]+$/)
			.withMessage("Incorrect format"),
		body("description")
			.isLength({ max: 3000 })
			.withMessage("Description can't be bigger, than 3000 symbols")
	],
	CategoryController.update
);

export { categoriesRouter };
