import ms from 'ms'

import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/customError.js";
import successResponse from "../../utils/successResponse.js"
import redis from "../../config/redis.js";

import UserService from "../user/user.service.js";
import JwtService from "../../utils/commonService/jwt.service.js";
import MongooseService from '../../utils/commonService/mogoose.service.js';

class AuthController {
  // 📝 Register user
  static register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;


    const result = await UserService.register({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    if (!result.success) {
      throw new CustomError(result.message, 400);
    }

    successResponse(res, null, result.message, 201)
  });

  // 🔐 Login user
  static login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userResult = await UserService.findByEmail(email)

    if (!userResult.success) {
      throw new CustomError(result.message, 400);
    }


    const hashPassword = userResult.data.user.password;
    const result = await UserService.login({ password, hashPassword });

    if (!result.success) {
      throw new CustomError(result.message, 400);
    }

    // ✅ Generate tokens

    result.data.user = MongooseService.cleanObject(userResult.data.user);

    const userId = result.data.user._id;
    const tokens = JwtService.generateTokens(result.data.user);

    await redis.set(
      `refresh:${userId}`,
      tokens.refreshToken, 
      "EX",
      ms(process.env.JWT_REFRESH_EXPIRATION) / 1000
    );

    // ✅ Set token(s) in cookies
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ms(process.env.JWT_ACCESS_EXPIRATION)
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ms(process.env.JWT_REFRESH_EXPIRATION)
    });

    successResponse(res, result.data, result.message, 200)
  });

  
  static refreshToken = asyncHandler(async (req, res) => {

    const { refreshToken } = req.cookies;
    const userId = req.user.id;

    const redisToken = await redis.get(`refresh:${userId}`);

    if (!redisToken || redisToken !== refreshToken) {
      throw new CustomError("Invalid refresh token", 401);
    }
    const userResult = await UserService.findById(userId);

    if (!userResult.success) {
      throw new CustomError("Invalid Details", 401)
    }

    userResult.data.user = MongooseService.cleanObject(userResult.data.user);

    const tokens = JwtService.generateTokens(userResult.data.user);

    await redis.set(
      `refresh:${userId}`,
      tokens.refreshToken, 
      "EX",
      ms(process.env.JWT_REFRESH_EXPIRATION) / 1000
    );

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ms(process.env.JWT_ACCESS_EXPIRATION)
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ms(process.env.JWT_REFRESH_EXPIRATION)
    });
    
    successResponse(res, userResult.data, "Token refreshed successfully", 200)

  })

  static logout = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    await redis.del(`refresh:${userId}`);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    successResponse(res, null, "Logged out successfully", 200)
  })

  static getUserInfo = asyncHandler(async (req, res) => {
    const result = await UserService.findById(req.user.id);
    if (!result.success) {
      throw new CustomError("Invalid Details", 401)
    }

    result.data.user = MongooseService.cleanObject(result.data.user);

    successResponse(res, result.data, result.message, 200)

  })

}

export default AuthController;
