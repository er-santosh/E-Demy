import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/auth";
import { BadRequestException } from "../utils/exceptions";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { signResetToken, verifyResetToken } from "../utils/jwt";
export default {
  async register(name, email, password) {
    //check user if exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw BadRequestException("Email is already taken");
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    const userInstance = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await userInstance.save();
    if (!user) {
      throw new Error();
    }
    user.password = undefined;
    return user;
  },

  async authenticateUser(email, password) {
    const userExist = await User.findOne({ email });
    if (userExist && (await comparePassword(password, userExist.password))) {
      return userExist;
    } else {
      throw BadRequestException("Invalid Credentials");
    }
  },

  async userInfo(id) {
    return await User.findById(id).select("-password").exec();
  },

  async getResetMailOptions(email) {
    const code = nanoid(6).toUpperCase();
    const hashedCode = await signResetToken({ code });

    const hashedEmail = await signResetToken({ email });

    const userUpdated = await User.findOneAndUpdate(
      { email },
      {
        passwordResetCode: code,
      }
    );

    if (!userUpdated) {
      throw BadRequestException("User doesnot exist");
    }

    const mailOptions = {
      from: "testing.edemy@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `
          <h1>Reset Password</h1>
          <p>A password reset for your account was requested.</p>
          <p>Please click the button below to change your password.</p>
          <p>Note that this link is valid for 24 hours. After the time limit has expired, you will have to resubmit the request for a password reset.</p>
          <div style="padding:30px">
          <a target="_blank" href="${process.env.FRONTEND_BASE_URL}/user/reset-password?email=${hashedEmail}&code=${hashedCode}" style="color:white;font-weight:bold;background-color:black;padding:20px;margin-top:10px;margin-bottom:10px;text-decoration:none">Change Your Password</a>
          </div>

          <p>If you did not make this request, <a href="${process.env.FRONTEND_BASE_URL}/dummy-support">please contact Support.</a></p>
      `,
    };

    return mailOptions;
  },

  async changePassword(email, code, password) {
    const decodedEmail = await verifyResetToken(email);
    const decodedCode = await verifyResetToken(code);

    if (!decodedCode.code || !decodedEmail.email) {
      throw BadRequestException("Invalid token");
    }

    const userUpdated = await User.findOneAndUpdate(
      {
        email: decodedEmail.email,
        passwordResetCode: decodedCode.code,
      },
      {
        passwordResetCode: "",
        password: await hashPassword(password),
      }
    );

    if (!userUpdated) {
      throw BadRequestException("Invalid Email/Verification Code");
    }
  },
};
