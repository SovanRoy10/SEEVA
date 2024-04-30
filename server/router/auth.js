import express from "express";

const router = express.Router();

import {
  forgotPassword,
  login,
  patientRegister,
  resetPassword,
} from "../controller/user.js";

router.post("/register", patientRegister);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

export default router;
