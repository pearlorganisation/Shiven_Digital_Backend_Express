// app.js
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import corsConfig from "./config/corsConfig.js";
import routes from "./routes.js";

import { connectRedis } from "./config/redis.js";
import redis from "./config/redis.js"; // renamed client -> redis
import successResponse from "./utils/successResponse.js";

dotenv.config();

const app = express();

// connect redis on startup
(async () => {
  await connectRedis();
})();

// Middlewares
app.use(morgan("dev"));
app.use(corsConfig);
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/v1", routes);

// Root test route
app.get("/", (req, res) => {
  successResponse(res, {}, "API is running 🚀 wiht cicd");
});

// Redis check route
app.get("/redis-check", async (req, res, next) => {
  try {
    await redis.set("foo", "bar");
    const result = await redis.get("foo");
    successResponse(res, { redisValue: result }, "Redis is working ✅");
  } catch (error) {
    next(error);
  }
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
