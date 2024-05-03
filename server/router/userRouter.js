import express from "express";
import {
  patientRegister,
  login,
  addNewAdmin,
  getAllDoctors,
  logoutAdmin,
  logoutPatient,
  addNewDoctor,
  forgotPassword,
  resetPassword,
  getAllPatients,
  getSingleUser,
  removeUser,
  getAllAdmins,
  getAllApprovedDoctors,
  updateDoctor,
  getDoctorsByDepartment,
} from "../controller/user.js";
import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors",getAllDoctors);
router.get("/doctors/:id", getSingleUser);
router.get("/patients", isAdminAuthenticated, getAllPatients);
router.get("/patients/:id", isAdminAuthenticated, getSingleUser);
router.post("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.post("/patient/logout", isUserAuthenticated, logoutPatient);
router.post("/doctor/addNew", addNewDoctor);

router.delete("/:id", isAdminAuthenticated, removeUser);
router.get("/admins", isAdminAuthenticated, getAllAdmins);
router.get("/approved-doctors", getAllApprovedDoctors);
router.put("/doctor/update/:id", isAdminAuthenticated, updateDoctor);
router.get("/doctor/:departmentSlug", getDoctorsByDepartment);

export default router;
