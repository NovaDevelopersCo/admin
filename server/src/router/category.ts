import { Router } from "express";

import { CategoryController } from "../controllers/CategoryController";

const categoriesRouter = Router();

categoriesRouter.get("/", CategoryController.getList);
categoriesRouter.get("/:id", CategoryController.getOne);

export { categoriesRouter };
