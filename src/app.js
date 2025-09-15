import express from "express";
import dotenv from "dotenv";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import routes from "./routes.js";

import successResponse from "./utils/successResponse.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/v1", routes);
// Sample route to test the server
app.get("/", (req,res) => {
  successResponse(res, {}, "API is running");
});

app.use(notFound);
app.use(errorHandler);

export default app;