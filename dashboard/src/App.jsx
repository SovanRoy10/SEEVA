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
import Login from "./pages/login/Login.jsx";
import Admins from "./pages/admins/Admins.jsx";
import AddAdmin from "./components/adminForm/AddAdmin.jsx";

import RTE from "./components/editor/RTE.jsx";
import Blogs from "./pages/blogs/Blogs.jsx";
import BlogDetails from "./components/singleBlog/BlogDetails.jsx";
import Protected from "./components/Protected.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import store from "./app/store.js";
import Vaccines from "./components/Vaccine/vaccine.jsx";

function App() {
  const Layout = () => {
    return (
      <div className="main h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-grow overflow-hidden">
          <div className="menuContainer overflow-y-auto">
            <Menu />
          </div>
          <div className="contentContainer flex-grow overflow-y-auto">
            <Outlet />
          </div>
        </div>
        <Footer />
        <Toaster />
      </div>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="doctors"
          element={
            <Protected>
              <Doctors />
            </Protected>
          }
        />
        <Route
          path="doctors/add"
          element={
            <Protected>
              <AddDoctor />
            </Protected>
          }
        />
        <Route
          path="doctors/:id"
          element={
            <Protected>
              <DoctorProfile />
            </Protected>
          }
        />
        <Route
          path="patients"
          element={
            <Protected>
              <Patients />
            </Protected>
          }
        />
        <Route
          path="appointments"
          element={
            <Protected>
              <Appointments />
            </Protected>
          }
        />
        <Route
          path="vaccines"
          element={
            <Protected>
              <Vaccines />
            </Protected>
          }
        />
        <Route
          path="appointments/add"
          element={
            <Protected>
              <NewAppointment />
            </Protected>
          }
        />
        <Route
          path="messages"
          element={
            <Protected>
              <Messages />
            </Protected>
          }
        />
        <Route
          path="admins"
          element={
            <Protected>
              <Admins />
            </Protected>
          }
        />
        <Route
          path="admins/add"
          element={
            <Protected>
              <AddAdmin />
            </Protected>
          }
        />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="login" element={<Login />} />
        <Route
          path="blogs"
          element={
            <Protected>
              <Blogs />
            </Protected>
          }
        />
        <Route
          path="blogs/add"
          element={
            <Protected>
              <RTE />
            </Protected>
          }
        />
        <Route
          path="blogs/:id"
          element={
            <Protected>
              <BlogDetails />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
export default App;
