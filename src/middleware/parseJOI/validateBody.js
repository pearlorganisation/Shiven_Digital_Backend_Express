import  throwCustomError  from "../../utils/customError.js";

const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const message = error.details.map(d => d.message).join(", ");
    return throwCustomError(message, 400);
  }

  req.body = value;
  next();
};

export default validateBody;
