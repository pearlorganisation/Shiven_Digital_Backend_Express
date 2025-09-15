// controllers/user.controller.js
import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/customError.js";

import UserService from "../user/user.service.js";
import JwtService from "../../utils/commonService/jwt.service.js";


class AuthController {
  // 📝 Register user
  static register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      throw new CustomError("Name, email, and password are required", 400);
    }

    const result = await UserService.register({ name, email, password, role });

    if (!result.success) {
      throw new CustomError(result.message, 400);
    }

    // ✅ Generate tokens
    const tokens = JwtService.generateTokens(result.data);

    res.status(201).json({
      success: true,
      message: result.message,
      data: {
        user: result.data,
        tokens,
      },
    });
  });

  // 🔐 Login user
  static login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError("Email and password are required", 400);
    }

    const result = await UserService.login({ email, password });

    if (!result.success) {
      throw new CustomError(result.message, 401);
    }

    // ✅ Generate tokens
    const tokens = JwtService.generateTokens(result.data.user);

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        user: result.data.user,
        tokens,
      },
    });
  });

  // 🔎 Get user by email
  static getUserByEmail = asyncHandler(async (req, res, next) => {
    const { email } = req.params;

    const result = await UserService.findByEmail(email);

    if (!result.success) {
      throw new CustomError(result.message, 404);
    }

    res.status(200).json(result);
  });
}

export default AuthController;


