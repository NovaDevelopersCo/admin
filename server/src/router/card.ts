import { Router } from "express";

import { CardController } from "../controllers/CardController";

const cardRoutes = Router();

import { AuthMiddleware } from "../middlewares/AuthMiddleware";

cardRoutes.get("/:id", CardController.getOne);
cardRoutes.get("/", CardController.getList);
cardRoutes.get("/many", CardController.getMany);
cardRoutes.get("/many-reference", CardController.getManyReference);
cardRoutes.post("/", AuthMiddleware, CardController.create);
cardRoutes.delete("/:id", AuthMiddleware, CardController.delete);
cardRoutes.put("/:id", AuthMiddleware, CardController.update);

export { cardRoutes };
