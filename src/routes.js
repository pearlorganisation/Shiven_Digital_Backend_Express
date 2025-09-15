import express from "express";

//All the routes will be defined here of modules
import authRoutes from "./modules/auth/auth.route.js"

const router = express.Router();




router.use("/auth",authRoutes)




export default router;