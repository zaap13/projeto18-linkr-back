import { Router } from "express";
import { getPostsByHash } from "../controllers/hashtags.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/hashtag/:hashtag", authMiddleware, getPostsByHash);

export default router;
