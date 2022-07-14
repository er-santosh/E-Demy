export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errMessage = err.message || "Something went wrong";

  if (err.name === "JsonWebTokenError") {
    statusCode = 400;
    errMessage = "Invalid or Expired token";
  }
  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    errMessage = "Unauthorised access";
  }
  res.status(statusCode).json({
    message: errMessage,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
