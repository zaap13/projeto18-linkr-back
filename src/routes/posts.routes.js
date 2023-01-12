import { Router } from "express";
import { postsMiddleware } from "../middlewares/posts.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  deleteShare,
  getAllPosts,
  getUserLikes,
  insertLike,
  newPost,
  postShare,
  putPost,
  removeLike,
  removePost,
} from "../controllers/posts.controllers.js";

const router = Router();

router.post("/posts", authMiddleware, postsMiddleware, newPost);
router.get("/posts", authMiddleware, getAllPosts);

router.delete("/posts/:id", authMiddleware, removePost);
router.put("/posts/:id", authMiddleware, putPost);

router.post("/posts/like/:id", authMiddleware, insertLike);
router.delete("/posts/like/:id", authMiddleware, removeLike);
router.get("/posts/me/likes", authMiddleware, getUserLikes);

router.post("/posts/share/:id", authMiddleware, postShare);
router.delete("/posts/share/:id", authMiddleware, deleteShare);
export default router;
