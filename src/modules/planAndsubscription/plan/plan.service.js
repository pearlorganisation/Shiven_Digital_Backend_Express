
import Plan from "./plan.model.js"


class PlanService {
  /**
   * Check if a plan exists by name or slug
   */
  static async findByNameOrSlug(name, slug) {
    const plan = await Plan.findOne({ $or: [{ name }, { slug }] });
    return plan;
  }

  /**
   * Create a new plan in the database
   */
  static async createPlan(planData) {
    const newPlan = await Plan.create(planData);
    return newPlan;
  }
}

export default PlanService;