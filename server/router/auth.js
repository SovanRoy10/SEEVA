import express from "express";

const router = express.Router();

import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../controller/auth.js";

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

export default router;
