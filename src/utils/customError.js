
const throwCustomError = (message = "Something went wrong", statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

export default throwCustomError;