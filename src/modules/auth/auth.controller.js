import ms from "ms";

import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/customError.js";
import successResponse from "../../utils/successResponse.js";
import redis from "../../config/redis.js";

import UserService from "../user/user.service.js";
import JwtService from "../../utils/commonService/jwt.service.js";
import MongooseService from "../../utils/commonService/mogoose.service.js";
import TokenService from "../../utils/commonService/token.service.js";
import emailVerificationTemplate from "../../mailTemplates/mailVerificationTemplate.js";
import EmailService from "../../utils/commonService/nodemailer.service.js";
import {
  INVALID_LINK_HTML,
  SUCCESS_VERIFICATION_HTML,
} from "./html.response.js";

class AuthController {
  static register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    const existing =await UserService.findByEmail(email);
    
    if(existing.success){
      throw new CustomError("User Already Exist",400)
    }


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

    const user = result.data.user;

    const token = await TokenService.generateRegisterToken(user._id);

    const html = emailVerificationTemplate({
      firstName: user.firstName,
      appName: "Chicku",
      verifyLink: `${process.env.BACKEND_URL}/auth/verify-email?userId=${user._id}&token=${token}`,
    });

    await EmailService.send({
      to: user.email,
      subject: "Verify Your Email Address",
      html,
    });

    successResponse(res, null, result.message, 201);
  });

  static verifyEmail = async (req, res) => {
    const { userId, token } = req.query;

    if (!userId || !token) {
      return res.send(INVALID_LINK_HTML);
    }

    const tokenValid = await TokenService.verifyRegisterToken(userId, token);

    if (!tokenValid) {
      return res.send(INVALID_LINK_HTML);
    }

    const result = await UserService.verifyUserEmail(userId);

    if (!result.success) {
      return res.send(INVALID_LINK_HTML);
    }

    const firstName = result.data.user.firstName;

    return res.send(SUCCESS_VERIFICATION_HTML(firstName));
  };


  //Controller for login
  static login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userResult = await UserService.findByEmail(email);

    if (!userResult.success) {
      throw new CustomError(userResult.message, 400);
    }

    const user = userResult.data.user;

    // Check if user is verified
    if (!user.isVerified) {
      const existingToken = await redis.get(`registerToken:${user._id}`);

      if (existingToken) {
        return successResponse(
          res,
          null,
          "Verification email already sent. Please check your inbox.",
          200
        );
      } else {
        // Generate a new register token
        const token = await TokenService.generateRegisterToken(user._id);

        // Send verification email
        const html = emailVerificationTemplate({
          firstName: user.firstName,
          appName: "Chicku",
          verifyLink: `${process.env.BACKEND_URL}/auth/verify-email?userId=${user._id}&token=${token}`,
        });

        await EmailService.send({
          to: user.email,
          subject: "Verify Your Email Address",
          html,
        });

        return successResponse(
          res,
          null,
          "Verification email sent. Please check your inbox.",
          200
        );
      }
    }

    // Continue with normal login
    const hashPassword = user.password;
    const result = await UserService.login({ password, hashPassword });

    if (!result.success) {
      throw new CustomError(result.message, 400);
    }

    result.data.user = MongooseService.cleanObject(user);

    const userId = user._id;
    const tokens = JwtService.generateTokens(user);

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
      maxAge: ms(process.env.JWT_ACCESS_EXPIRATION),
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ms(process.env.JWT_REFRESH_EXPIRATION),
    });

    successResponse(res, result.data, result.message, 200);
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
      throw new CustomError("Invalid Details", 401);
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
      maxAge: ms(process.env.JWT_ACCESS_EXPIRATION),
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ms(process.env.JWT_REFRESH_EXPIRATION),
    });

    successResponse(res, userResult.data, "Token refreshed successfully", 200);
  });

  static logout = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    await redis.del(`refresh:${userId}`);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    successResponse(res, null, "Logged out successfully", 200);
  });

  static getUserInfo = asyncHandler(async (req, res) => {
    const result = await UserService.findById(req.user.id);
    if (!result.success) {
      throw new CustomError("Invalid Details", 401);
    }

    result.data.user = MongooseService.cleanObject(result.data.user);

    successResponse(res, result.data, result.message, 200);
  });
}

export default AuthController;
