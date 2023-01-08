import { Router } from "express";
import { postsMiddleware } from "../middlewares/posts.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllPosts, newPost, removePost } from "../controllers/posts.controllers.js";

const router = Router();

router.post("/posts", authMiddleware, postsMiddleware, newPost);

router.get("/posts", authMiddleware, getAllPosts);

router.delete("/posts/:id", authMiddleware, removePost);

export default router;