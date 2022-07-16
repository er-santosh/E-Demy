import { transporter } from "../utils/nodemailer";
import authService from "../services/auth.service";
import { signAuthToken } from "../utils/jwt";
import userService from "../services/user.service";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.register(name, email, password);
    const token = await signAuthToken({ _id: user._id });

    user.password = undefined;
    res.cookie("token", token, {
      httpOnly: true,
      // secure:true
    });
    res.json({ user, message: "User signed up successfully" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.authenticateUser(email, password);
    const token = await signAuthToken({ _id: user._id });

    user.password = undefined;
    user.passwordResetCode = undefined;
    res.cookie("token", token, {
      httpOnly: true,
      // secure:true
    });
    res.status(200).json({ user, message: "User logged in successfully" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await res.clearCookie("token");
    res.json({
      message: "User is logged out",
    });
  } catch (error) {
    next(error);
  }
};

export const currentUser = async (req, res, next) => {
  try {
    const user = await userService.userInfo(req.auth._id);
    if (user) {
      res.json({ ok: true });
    }
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const mailOptions = await authService.getResetMailOptions(email);
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json({
          message:
            "Password Reset email has been sent. Please check your mail.",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;

    await authService.changePassword(email, code, password);

    res.status(200).json({
      message: "Password reset successful. Try logging in now.",
    });
  } catch (error) {
    next(error);
  }
};
