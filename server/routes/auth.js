import express from "express";
import { login, logout, register, user } from "../controllers/auth";
import { auth } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/user", auth, user);
module.exports = router;
