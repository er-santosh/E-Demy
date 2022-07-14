const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const errMessage = err.message || "Something went wrong";
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token");
  }
  res.status(statusCode).json({
    message: errMessage,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
