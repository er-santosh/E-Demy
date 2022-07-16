import express from "express";
import {
  becomeInstructor,
  currentInstructor,
  getAccountStatus,
  stripePaymentSetup,
} from "../controllers/instructor.controller";

import { requireSignin } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/become-instructor", requireSignin, becomeInstructor);
router.post("/stripe-payment-setup", requireSignin, stripePaymentSetup);
router.get("/get-account-status", requireSignin, getAccountStatus);
router.get("/current-instructor", requireSignin, currentInstructor);

module.exports = router;
