import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/customError.js";
import successResponse from "../../utils/successResponse.js";
import PlanService from "./plan.service.js"; // Adjust path

class PlanController {
  
  static createPlan = asyncHandler(async (req, res) => {
    const { 
      name, 
      description, 
      price, 
      currency, 
      limits, 
      features, 
      isActive 
    } = req.body;

    // 1. Basic Validation
    if (!name || !price || price.monthly === undefined || price.yearly === undefined) {
      throw new CustomError("Plan name and pricing (monthly & yearly) are required", 400);
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-') 
      .replace(/^-+|-+$/g, ''); 
    // 3. Check if plan already exists
    const existingPlan = await PlanService.findByNameOrSlug(name, slug);
    
    if (existingPlan) {
      throw new CustomError("A plan with this name or slug already exists", 400);
    }

    // 4. Create the Plan via Service
    const result = await PlanService.createPlan({
      name,
      slug,
      description,
      price,
      currency,
      limits,
      features,
      isActive
    });

    if (!result) {
      throw new CustomError("Failed to create the subscription plan", 500);
    }

    // 5. Send Success Response
    successResponse(res, { plan: result }, "Subscription plan created successfully", 201);
  });

}

export default PlanController;