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
import Profile from "./components/doctorsProfile/Profile.jsx";
import AddDoctor from "./components/addDoctorForm/AddDoctors.jsx";
import Appointments from "./components/appointments/Appointments.jsx";
import NewAppointment from "./components/appointments/NewAppointment.jsx";
import Messages from "./pages/messages/Messages.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";

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
        <Route path="doctors/:id" element={<Profile />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/add" element={<NewAppointment />} />
        <Route path="messages" element={<Messages />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:id/:token" element={<ResetPassword />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
