import { Router } from "express";

import { CategoryController } from "../controllers/CategoryController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const categoriesRouter = Router();

categoriesRouter.get("/", CategoryController.getList);
categoriesRouter.get("/:id", CategoryController.getOne);
categoriesRouter.put("/:id", AuthMiddleware, CategoryController.update);

export { categoriesRouter };
