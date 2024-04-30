import Home from "./pages/home/Home.jsx";
import Patients from "./pages/patients/Patients.jsx";
import Doctors from "./pages/doctors/Doctors.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import "./index.css";
import Menu from "./components/menu/Menu.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import DoctorProfile from "./components/doctorsProfile/Profile.jsx";
import AddDoctor from "./components/addDoctorForm/AddDoctors.jsx";
import Appointments from "./components/appointments/Appointments.jsx";
import NewAppointment from "./components/appointments/NewAppointment.jsx";
import Messages from "./pages/messages/Messages.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Login from "./pages/login/Login.jsx";
import Admins from "./pages/admins/Admins.jsx";
import AddAdmin from "./components/adminForm/AddAdmin.jsx";

import RTE from "./components/editor/RTE.jsx";
import Blogs from "./pages/blogs/Blogs.jsx";

import { Toaster } from "react-hot-toast";

function App() {
  const Layout = () => {
    return (
      <div className="main overflow-hidden">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Toaster />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="doctors/add" element={<AddDoctor />} />
        <Route path="doctors/:id" element={<DoctorProfile />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/add" element={<NewAppointment />} />
        <Route path="messages" element={<Messages />} />
        <Route path="admins" element={<Admins />} />
        <Route path="admins/add" element={<AddAdmin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/add" element={<RTE />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
