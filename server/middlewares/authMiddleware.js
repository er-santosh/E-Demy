import jwt from "jsonwebtoken";
import User from "../models/user";

export const auth = async (req, res, next) => {
  let token;

  try {
    // Get token from header
    token = req.cookies.token;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    req.user = await User.findById(decoded._id).select("-password");

    next();
  } catch (error) {
    res.status(401);
    next("Not authorized");
  }

  if (!token) {
    res.status(401);
    next("Not authorized, no token");
  }
};
