import express from "express";

//All the routes will be defined here of modules
import authRoutes from "./modules/auth/auth.route.js"
import brandRoutes from "./modules/brand/brand.route.js"

const router = express.Router();



router.use("/auth",authRoutes)


// Brand routes
router.use("/brands", brandRoutes); 


export default router;