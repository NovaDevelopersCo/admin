import { Router } from "express";

import { AuthController } from "../controllers/AuthController";

const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/registration", AuthController.registration);
authRoutes.post("/logout", AuthController.logout);

export { authRoutes };
