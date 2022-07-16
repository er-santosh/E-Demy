export const BadRequestException = (message) => {
  let error = new Error(message);
  error.statusCode = 400;

  return error;
};

export const UnauthorisedException = (message) => {
  let error = new Error(message);
  error.statusCode = 401;

  return error;
};

export const ForbiddenException = (message = "Access Forbidden") => {
  let error = new Error(message);
  error.statusCode = 403;

  return error;
};
