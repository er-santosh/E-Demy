import User from "../models/user";
import { hashPassword } from "../utils/auth";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //validate

    //check user if exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json("Email is already taken.");
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json(err);
  }
};
