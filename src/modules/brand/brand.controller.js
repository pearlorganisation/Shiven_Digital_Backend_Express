// brand.controller.js - brand module

import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/customError.js";
import successResponse from "../../utils/successResponse.js";

import BrandService from "./brand.service.js";
import MongooseService from "../../utils/commonService/mogoose.service.js";

class BrandController {

  //  Create brand
  static createBrand = asyncHandler(async (req, res) => {
    const data = { ...req.body, userId: req.user.id };

    const result = await BrandService.create(data);

    if (!result.success) {
      throw new CustomError(result.message, 400);
    }

    successResponse(res, MongooseService.cleanObject(result.data.brand), result.message, 201);
  });

  //  Get all brands for logged-in user
  static getBrandsByUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const result = await BrandService.getByUserId(userId);

    if (!result.success) {
      throw new CustomError(result.message, 400);
    }

    successResponse(res, MongooseService.cleanObject(result.data.brands), result.message, 200);
  });

  //  Get brand by ID
  static getBrandById = asyncHandler(async (req, res) => {
    const brandId = req.params.id;
    const result = await BrandService.getById(brandId);

    if (!result.success) {
      throw new CustomError(result.message, 404);
    }

    successResponse(res, MongooseService.cleanObject(result.data.brand), result.message, 200);
  });

  //  Update brand
  static updateBrand = asyncHandler(async (req, res) => {
    const brandId = req.params.id;
    const data = req.body;

    const result = await BrandService.update(brandId, data);

    if (!result.success) {
      throw new CustomError(result.message, 404);
    }

    successResponse(res, MongooseService.cleanObject(result.data.brand), result.message, 200);
  });

  //  Delete brand
  static deleteBrand = asyncHandler(async (req, res) => {
    const brandId = req.params.id;

    const result = await BrandService.delete(brandId);

    if (!result.success) {
      throw new CustomError(result.message, 404);
    }

    successResponse(res, MongooseService.cleanObject(result.data.brand), result.message, 200);
  });

}

export default BrandController;
