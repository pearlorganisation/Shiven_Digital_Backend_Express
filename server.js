
import dotenv from "dotenv";
import app from "./src/app.js";
import { connectToMongoDB } from "./src/config/db.js";
//import redis from "./src/config/redis.js";

dotenv.config();
await connectToMongoDB();

const PORT = process.env.PORT || 5000;

//redis.on("connect", () => {});

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});


