import express from "express";
import { login, logout, register, currentUser } from "../controllers/auth";
import { requireSignin } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
module.exports = router;
