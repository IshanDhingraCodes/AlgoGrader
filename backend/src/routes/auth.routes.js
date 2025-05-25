import express from "express";
import {
  changePassword,
  check,
  forgotPassword,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.get("/check", authMiddleware, check);
authRoutes.post("/forgotPassword", forgotPassword);
authRoutes.post("/change-password/:forgotPasswordToken", changePassword);

export default authRoutes;
