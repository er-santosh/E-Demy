import express from "express";
import {
  login,
  logout,
  register,
  currentUser,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { requireSignin } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
module.exports = router;
