import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { discussProblem, aiLimiter } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/discuss", authMiddleware, aiLimiter, discussProblem);

export default router;
