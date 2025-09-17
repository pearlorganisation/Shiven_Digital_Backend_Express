// brand.route.js - brand module

import express from "express";
import validateBody from "../../middleware/parseJOI/validateBody.js";
import verifyAccessToken from "../../middleware/auth/verifyAccessToken.js";

import BrandController from "./brand.controller.js";
import brandSchema from "./brand.JOI.js"; // Joi schemas for create/update

const router = express.Router();

//  Create brand
router.post(
  "/",
  verifyAccessToken,
  validateBody(brandSchema.createBrand),
  BrandController.createBrand
);

//  Get all brands for logged-in user
router.get("/", verifyAccessToken, BrandController.getBrandsByUser);

//  Get brand by ID
router.get("/:id", verifyAccessToken, BrandController.getBrandById);

//  Update brand
router.patch(
  "/:id",
  verifyAccessToken,
  validateBody(brandSchema.updateBrand),
  BrandController.updateBrand
);

//  Delete brand
router.delete("/:id", verifyAccessToken, BrandController.deleteBrand);

export default router;
