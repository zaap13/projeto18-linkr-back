import { Router } from "express";
import { newComment } from "../controllers/comments.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { commentsMiddleware } from "../middlewares/comments.middlewares.js";

const router = Router();

router.post("/comments", authMiddleware, commentsMiddleware, newComment);

export default router;