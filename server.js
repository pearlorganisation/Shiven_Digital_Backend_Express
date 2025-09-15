
import dotenv from "dotenv";
import app from "./src/app.js";
import { connectToMongoDB } from "./src/config/db.js";

dotenv.config();
await connectToMongoDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
