import express from "express";
import verifyAccessToken from "../../../middleware/auth/verifyAccessToken.js";
import validateBody from "../../../middleware/parseJOI/validateBody.js";

import PlanController from "./plan.controller.js";
import planSchema from "./plan.JOI.js";

const router = express.Router();

//   Create Plan
router.post(
  "/",
  verifyAccessToken,
  validateBody(planSchema.createPlan),
  PlanController.createPlan
);

router.patch(
  "/:id",
  verifyAccessToken,
  validateBody(planSchema.updatePlan),
  PlanController.updatePlan
);

router.get("/", verifyAccessToken, PlanController.getAllPlans);

export default router;
