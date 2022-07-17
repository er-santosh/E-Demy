const stripe = require("stripe")(process.env.STRIPE_SECRET);
import queryString from "query-string";
import User from "../models/user.model";
import { ForbiddenException } from "../utils/exceptions";
import userService from "../services/user.service";
import stripeService from "../services/stripe.service";

export const becomeInstructor = async (req, res, next) => {
  const userId = req.auth._id;
  try {
    const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          role: "Instructor",
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(userUpdated);
  } catch (error) {
    next(error);
  }
};

export const stripePaymentSetup = async (req, res, next) => {
  try {
    // 1. find user from db
    const user = await userService.findUserById(req.auth._id);
    // 2. if user dont have stripe_account_id yet, then create new
    if (!user.stripe_account_id) {
      const account = await stripeService.createAccount();
      user.stripe_account_id = account.id;
      user.save();
    }

    // 3. create account link based on account id (for frontend to complete onboarding)
    let accountLink = await stripeService.createAccountLink(
      user.stripe_account_id
    );
    // 4. pre-fill any info such as email (optional), then send url resposne to frontend
    /*  accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    }); */
    // 5. then send the account link as response to fronend
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
  } catch (err) {
    next(err);
  }
};

export const getAccountStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id).exec();
    const account = await stripeService.retrieveAccount(user.stripe_account_id);
    if (!account.charges_enabled) {
      throw ForbiddenException();
    } else {
      const userUpdated = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: account,
        },
        { new: true }
      )
        .select("-password")
        .exec();
      res.json(userUpdated);
    }
  } catch (error) {
    next(error);
  }
};

export const currentInstructor = async (req, res, next) => {
  try {
    let user = await userService.findUserById(req.auth._id);
    if (!user.role.includes("Instructor")) {
      throw ForbiddenException();
    } else {
      res.json({ ok: true });
    }
  } catch (error) {
    next(error);
  }
};
