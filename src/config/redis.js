// redisClient.js
import { createClient } from "redis";

const redis = createClient({
  username: "default",
  password: "3kIFMWg8tkAbiUtWxTWONisEqsxIdD3K",
  socket: {
    host: "redis-12488.crce179.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 12488,
  },
});

redis.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

redis.on("connect", () => {
  console.log("🔄 Connecting to Redis...");
});

redis.on("ready", () => {
  console.log("✅ Redis connected successfully!");
});

const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
};

export { connectRedis };
export default redis;
