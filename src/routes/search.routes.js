import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { searchUsers } from "../controllers/search.controllers.js";

const router = Router();

router.get("/search/:input", authMiddleware, searchUsers);

export default router;