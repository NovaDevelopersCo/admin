import { Router } from "express";

import { AuthController } from "../controllers/AuthController";

import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/registration", AuthController.registration);
authRoutes.post("/logout", AuthController.logout);
authRoutes.post("/refresh", AuthController.refresh);
authRoutes.get("/profile", AuthMiddleware, AuthController.getProfile);

export { authRoutes };
