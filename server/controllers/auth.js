import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/auth";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    //validate

    //check user if exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json("Email is already taken.");
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist && (await comparePassword(password, userExist.password))) {
      const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      userExist.password = undefined;
      res.cookie("token", token, {
        httpOnly: true,
        // secure:true
      });

      res.status(200).json(userExist);
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await res.clearCookie("token");
    res.json("User logged out");
  } catch (error) {
    next(error);
  }
};

export const currentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id).select("-password");
    res.json(user);
  } catch (error) {
    next(error);
  }
};
