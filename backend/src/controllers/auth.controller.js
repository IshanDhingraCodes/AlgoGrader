import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { forgotPasswordMailGenContent, sendEmail } from "../utils/mail.js";

export const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json(new ApiError(400, "Credientials required."));
  }

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(400).json(new ApiError(400, "User already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: UserRole.USER,
    },
  });

  if (!newUser) {
    return res.status(503).json(new ApiError(503, "User not created"));
  }

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          image: newUser.image,
        },
      },
      "User created succesfully",
    ),
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiError(400, "Please provide email & password!"));
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json(new ApiError(401, "User not found."));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json(new ApiError(401, "Invalid Credentials"));
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        },
      },
      "User Logged in succesfully",
    ),
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

export const check = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        "User authenticated successfully",
      ),
    );
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res
      .status(401)
      .json(new ApiError(401, "No account found with this email."));
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 5 * 60 * 1000);

  const forgotPasswordToken = await db.forgotPasswordToken.upsert({
    where: { email },
    update: { token, expires },
    create: { email, token, expires, userId: user.id },
  });

  const verificationUrl = `http://localhost:8080/api/v1/auth/change-password/${token}`;

  const mailGenContent = forgotPasswordMailGenContent(
    user.name,
    verificationUrl,
  );

  await sendEmail({
    email: email,
    subject: "Reset your password",
    mailGenContent,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        forgotPasswordToken,
        "ForgotPassword verification email sent successfully in your email address!.",
      ),
    );
});

export const changePassword = asyncHandler(async (req, res) => {
  const { forgotPasswordToken } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!forgotPasswordToken) {
    return res.status(401).json(new ApiError(401, "Token is required!"));
  }

  if (!newPassword || !confirmPassword) {
    return res.status(400).json(new ApiError(400, "All fields are required!"));
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json(new ApiError(400, "Both password should be same."));
  }

  const user = await db.forgotPasswordToken.findFirst({
    where: {
      token: forgotPasswordToken,
    },
  });

  if (!user || user.expires < new Date()) {
    return res.status(401).json(new ApiError(401, "Invalid or expired token."));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: {
      id: user.userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.forgotPasswordToken.delete({
    where: {
      token: forgotPasswordToken,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully."));
});
