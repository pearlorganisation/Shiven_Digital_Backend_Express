import CustomError from "../../utils/customError.js";

const validateBody = (schema) => (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new CustomError(
      "Validation failed: request body is required",
      400
    );
  }

  const result = schema.safeParse(req.body);

  if (!result.success) {
    const message =
      process.env.NODE_ENV === "development"
        ? result.error.errors
            .map((err) => err.message)
            .join(", ")
        : "Validation failed";

    throw new CustomError(message, 400);
  }

  // Zod returns parsed & sanitized data
  req.body = result.data;
  next();
};

export default validateBody;
