import { Router } from "express";
import {
  getPostsByHash,
  getTrending,
} from "../controllers/hashtags.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/hashtag/:hashtag", authMiddleware, getPostsByHash);
router.get("/trending", authMiddleware, getTrending);

export default router;
