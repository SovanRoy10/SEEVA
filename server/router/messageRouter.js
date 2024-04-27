import express from "express";
import { sendMessage, getAllMessages } from "../controller/message.js";
import {
  isUserAuthenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", isUserAuthenticated, sendMessage);
router.get("/getAll", isAdminAuthenticated, getAllMessages);

export default router;
