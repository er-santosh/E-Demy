import jwt from "jsonwebtoken";

export const signAuthToken = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const signResetToken = async (payload) => {
  return await jwt.sign(payload, process.env.RESET_PASSWORD_SECRET, {
    expiresIn: "24h",
  });
};

export const verifyResetToken = async (token) => {
  return await jwt.verify(
    token,
    process.env.RESET_PASSWORD_SECRET,
    (err, decoded) => {
      if (err) {
        throw err; //error middleware will handle this
      }
      return decoded;
    }
  );
};
