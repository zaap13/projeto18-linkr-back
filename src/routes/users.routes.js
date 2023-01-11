import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { followMiddleware } from "../middlewares/user.middleware.js";
import { userPageData, followUser, unfollowUser } from "../controllers/users.controllers.js";

const router = Router();

router.get("/user/:id", authMiddleware, userPageData);
router.post("/user/follow/:id", authMiddleware, followMiddleware, followUser);
router.delete("/user/unfollow/:id", authMiddleware, unfollowUser);

export default router;