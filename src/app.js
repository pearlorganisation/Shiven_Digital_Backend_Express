import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "../src/config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

connectToMongoDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;