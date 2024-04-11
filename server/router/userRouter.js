import express from "express";
import {
  patientRegister,
  login,
  addNewAdmin,
  getAllDoctors,
  logoutAdmin,
  logoutPatient,
  addNewDoctor,
} from "../controller/user.js";
import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", isAdminAuthenticated, getAllDoctors);
router.post("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.post("/patient/logout", isUserAuthenticated, logoutPatient);
router.post("/doctor/addNew", addNewDoctor);

export default router;
