import { Router } from "express";
import { postsMiddleware } from "../middlewares/posts.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllPosts, newPost } from "../controllers/posts.controllers.js";

const router = Router();

router.post("/posts", authMiddleware, postsMiddleware, newPost);

router.get("posts", getAllPosts);

export default router;
