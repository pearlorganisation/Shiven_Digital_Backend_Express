// validations/user.validation.js
import Joi from "joi";

class authSchema {
  // 📝 Registration schema
  static register = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
      .valid("user", "agency",).required()
  });

  // 🔐 Login schema
  static login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
}

export default authSchema;
