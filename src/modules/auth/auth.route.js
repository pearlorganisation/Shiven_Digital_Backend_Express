import express from "express"
import validateBody from "../../middleware/parseJOI/validateBody.js" 
import verifyAccessToken from "../../middleware/auth/verifyAccessToken.js"
import verifyRefreshToken from "../../middleware/auth/verifyRefreshToken.js"

import AuthController from "./auth.controller.js"
import authSchema from "./auth.JOI.js"

const router=express.Router()

router.post("/register",validateBody(authSchema.register),AuthController.register)
router.post("/login",validateBody(authSchema.login),AuthController.login)
router.get("/me",verifyAccessToken,AuthController.getUserInfo)
router.post("/refresh",verifyRefreshToken,AuthController.refreshToken)
router.post("/logout",verifyRefreshToken,AuthController.logout)
router.get("/verify-email",AuthController.verifyEmail)

export default router;
