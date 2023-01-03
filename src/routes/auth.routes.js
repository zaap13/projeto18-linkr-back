import { Router } from "express";
import { postUser, signIn } from "../controllers/auth.controllers.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

const router = Router();

router.post("/sign-up", userMiddleware, postUser);
router.post("/", signIn);

export default router;
