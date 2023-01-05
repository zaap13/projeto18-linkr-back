import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userPageData } from "../controllers/users.controllers.js";

const router = Router();

router.get("/user/:id", authMiddleware, userPageData);

export default router;