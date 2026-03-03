// plan.controller.js

import asyncHandler from "../../../utils/asyncHandler.js";
import CustomError from "../../../utils/customError.js";
import successResponse from "../../../utils/successResponse.js";
import MongooseService from "../../../utils/commonService/mogoose.service.js";

import PlanService from "./plan.service.js";
import Plan from "./plan.model.js"; // 👈 needed to check existence

class PlanController {
  // Create Plan
  static createPlan = asyncHandler(async (req, res) => {
    const data = { ...req.body };

    //  Convert name to uppercase
    data.name = data.name.trim().toUpperCase();

    //  Check if name already exists
    const existingPlan = await Plan.findOne({ name: data.name });

    if (existingPlan) {
      throw new CustomError("Plan name already exists", 400);
    }

    const result = await PlanService.create(data);

    if (!result.success) {
      throw new CustomError(result.message, 400);
    }

    result.data.plan = MongooseService.cleanObject(result.data.plan);

    successResponse(res, result.data, result.message, 201);
  });

  static updatePlan = asyncHandler(async (req, res) => {
    const planId = req.params.id;
    const data = { ...req.body };

    //  If name is being updated
    if (data.name) {
      data.name = data.name.trim().toUpperCase();

      const existingPlan = await Plan.findOne({
        name: data.name,
        _id: { $ne: planId }, // exclude current plan
      });

      if (existingPlan) {
        throw new CustomError("Plan name already exists", 400);
      }
    }

    const result = await PlanService.update(planId, data);

    if (!result.success) {
      throw new CustomError(result.message, 404);
    }

    result.data.plan = MongooseService.cleanObject(result.data.plan);

    successResponse(res, result.data, result.message, 200);
  });

  static getAllPlans = asyncHandler(async (req, res) => {
    const result = await PlanService.getAll(req.query);

    if (!result.success) {
      throw new CustomError(result.message, 400);
    }

    // Clean each plan
    result.data.plans = result.data.plans.map((plan) =>
      MongooseService.cleanObject(plan)
    );

    successResponse(res, result.data, result.message, 200);
  });
}

export default PlanController;
