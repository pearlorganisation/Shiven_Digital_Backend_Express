import CustomError from "../../utils/customError.js";

const validateBody = (schema) => (req, res, next) => {

  if (!req.body || Object.keys(req.body).length === 0) {
    throw new CustomError("Validation failed: request body is required", 400);
  }

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
   
    const message =
      process.env.NODE_ENV === "development"
        ? error.details.map((d) => d.message).join(", ")
        : "Validation failed";

    throw new CustomError(message, 400);
  }

  req.body = value;
  next();
};

export default validateBody;
