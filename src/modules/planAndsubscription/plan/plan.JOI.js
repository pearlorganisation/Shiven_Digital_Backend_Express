import Joi from "joi";

class planSchema {
  static createPlan = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),

    description: Joi.string().max(500).optional(),

    price: Joi.number().min(0).required(),

    discountType: Joi.string()
      .valid("flat", "percentage")
      .allow(null)
      .optional(),

    discountAmount: Joi.number()
      .min(0)
      .when("discountType", {
        is: Joi.exist().not(null),
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),

    durationDays: Joi.number().min(1).required(),

    currency: Joi.string().uppercase().optional(),

    trialDays: Joi.number().min(0).optional(),

    limits: Joi.object({
      maxUsers: Joi.number().min(1).optional(),
      maxSocialAccounts: Joi.number().min(1).optional(),
      monthlyEmails: Joi.number().min(0).optional(),
      monthlySms: Joi.number().min(0).optional(),
      monthlyWhatsapp: Joi.number().min(0).optional(),
      storageSpaceMB: Joi.number().min(1).optional(),
    }).optional(),

    features: Joi.object({
      aiContentWriter: Joi.boolean().optional(),
      premiumTemplates: Joi.boolean().optional(),
      advancedAnalytics: Joi.boolean().optional(),
      apiAccess: Joi.boolean().optional(),
      removeBranding: Joi.boolean().optional(),
    }).optional(),

    isActive: Joi.boolean().optional(),

    sortOrder: Joi.number().optional(),
  });

  static updatePlan = Joi.object({
    name: Joi.string().trim().min(2).max(100).optional(),

    description: Joi.string().max(500).optional(),

    price: Joi.number().min(0).optional(),

    discountType: Joi.string()
      .valid("flat", "percentage")
      .allow(null)
      .optional(),

    discountAmount: Joi.number()
      .min(0)
      .when("discountType", {
        is: Joi.exist().not(null),
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),

    durationDays: Joi.number().min(1).optional(),

    currency: Joi.string().uppercase().optional(),

    trialDays: Joi.number().min(0).optional(),

    limits: Joi.object().optional(),

    features: Joi.object().optional(),

    isActive: Joi.boolean().optional(),

    sortOrder: Joi.number().optional(),
  });
  
}

export default planSchema;
