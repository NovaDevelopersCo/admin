import { Router } from "express";

import { authRoutes } from "./auth";
import { cardRoutes } from "./card";

const router = Router();

router.use("/auth", authRoutes);
router.use("/cards", cardRoutes);

export { router };
