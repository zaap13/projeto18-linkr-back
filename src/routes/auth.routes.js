import { Router } from "express";
import { postUser } from "../controllers/auth.controllers.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

const router = Router();

router.post("/sign-up", userMiddleware, postUser);

export default router;
