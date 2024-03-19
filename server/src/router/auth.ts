import { Router } from "express";

import { AuthController } from "../controllers/AuthController";

import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { body } from "express-validator";

const authRoutes = Router();

authRoutes.post(
	"/login",
	[body("login").notEmpty(), body("password").notEmpty()],
	AuthController.login
);
authRoutes.post(
	"/registration",
	[body("login").notEmpty(), body("password").notEmpty()],
	AuthController.registration
);
authRoutes.post("/logout", AuthController.logout);
authRoutes.post("/refresh", AuthController.refresh);
authRoutes.get("/profile", AuthMiddleware, AuthController.getProfile);

export { authRoutes };
