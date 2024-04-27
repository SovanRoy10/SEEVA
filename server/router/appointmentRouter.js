import express from "express";
import { postAppointment,getAllAppointments,deleteAppointment,updateAppointmentStatus } from "../controller/appointment.js";

import { isAdminAuthenticated, isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isUserAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
