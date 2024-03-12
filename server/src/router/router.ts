import { Router } from "express";

import { authRoutes } from "./auth";
import { cardRoutes } from "./card";
import { categoriesRouter } from "./category";

const router = Router();

router.use("/auth", authRoutes);
router.use("/cards", cardRoutes);
router.use("/categories", categoriesRouter);

export { router };
