import express from "express";
import { sendMessage, getAllMessages,deleteMessage } from "../controller/message.js";
import {
  isUserAuthenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", isUserAuthenticated, sendMessage);
router.get("/getAll", isAdminAuthenticated, getAllMessages);
router.delete("/delete/:id", isAdminAuthenticated, deleteMessage);

export default router;
