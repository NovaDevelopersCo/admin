import { Router } from "express";

import { authRoutes } from "./auth";
import { cardRoutes } from "./card";
import { categoriesRouter } from "./category";
import { orderRoutes } from "./order";
import { healthRouter } from "./health";

const router = Router();

router.use("/auth", authRoutes);
router.use("/cards", cardRoutes);
router.use("/categories", categoriesRouter);
router.use("/orders", orderRoutes);
router.use("/health", healthRouter);

export { router };
