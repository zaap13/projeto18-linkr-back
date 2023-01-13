import { Router } from "express";
import { getComments, newComment } from "../controllers/comments.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { commentsMiddleware } from "../middlewares/comments.middlewares.js";

const router = Router();

router.post("/comments/:postId", authMiddleware, commentsMiddleware, newComment);
router.get("/comments", authMiddleware, getComments);

export default router;