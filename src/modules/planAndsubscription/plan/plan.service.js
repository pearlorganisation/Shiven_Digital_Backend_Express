import Plan from "./plan.model.js";

const isDev = () => process.env.NODE_ENV === "development";

class PlanService {
  static async create(data) {
    try {
      const plan = await Plan.create(data);

      return {
        success: true,
        message: "Plan created successfully",
        data: { plan },
      };
    } catch (error) {
      // Handle duplicate key error (Mongo error code 11000)
      if (error.code === 11000) {
        return {
          success: false,
          message: "Plan name already exists",
          data: null,
        };
      }

      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }
  static async update(planId, data) {
    try {
      const plan = await Plan.findByIdAndUpdate(
        planId,
        { ...data, updatedAt: Date.now() },
        { new: true }
      );

      if (!plan) {
        return { success: false, message: "Plan not found", data: null };
      }

      return {
        success: true,
        message: "Plan updated successfully",
        data: { plan },
      };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  static async getAll(query) {
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      const plans = await Plan.find()
        .sort({ sortOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Plan.countDocuments();

      return {
        success: true,
        message: "Plans fetched successfully",
        data: {
          plans,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }
}

export default PlanService;
