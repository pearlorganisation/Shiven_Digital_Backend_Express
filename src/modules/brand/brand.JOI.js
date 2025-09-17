import Joi from "joi";

class brandSchema {

  //  Create Brand schema
  static createBrand = Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/) // must be a valid ObjectId
      .required(),

    name: Joi.string().trim().min(2).max(100).required(),

    logo: Joi.string().uri().optional(), 

    description: Joi.string().max(500).optional(),

    website: Joi.string().uri().optional(),

    contact: Joi.object({
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9+\-\s()]{7,20}$/)
        .optional(),
      address: Joi.object({
        country: Joi.string().optional(),
        city: Joi.string().optional(),
        location: Joi.string().optional(),
      }).optional(),
    }).required(),

    social: Joi.object({
      instagram: Joi.string().uri().optional(),
      facebook: Joi.string().uri().optional(),
      twitter: Joi.string().uri().optional(),
      youtube: Joi.string().uri().optional(),
      linkedin: Joi.string().uri().optional(),
    }).optional(),
  });

  //  Update Brand schema (all fields optional)
  static updateBrand = Joi.object({
    name: Joi.string().trim().min(2).max(100).optional(),
    logo: Joi.string().uri().optional(),
    description: Joi.string().max(500).optional(),
    website: Joi.string().uri().optional(),
    contact: Joi.object({
      email: Joi.string().email().optional(),
      phone: Joi.string()
        .pattern(/^[0-9+\-\s()]{7,20}$/)
        .optional(),
      address: Joi.object({
        country: Joi.string().optional(),
        city: Joi.string().optional(),
        location: Joi.string().optional(),
      }).optional(),
    }).optional(),
    social: Joi.object({
      instagram: Joi.string().uri().optional(),
      facebook: Joi.string().uri().optional(),
      twitter: Joi.string().uri().optional(),
      youtube: Joi.string().uri().optional(),
      linkedin: Joi.string().uri().optional(),
    }).optional(),
  });
}

export default brandSchema;
