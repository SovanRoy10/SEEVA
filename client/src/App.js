import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./components/Pages/Home";

import About from "./components/Pages/About";
import Doctors from "./components/Pages/Doctors";
import Blog from "./components/Pages/Blog";
import Appointments from "./components/Pages/Appointments";
import Departments from "./components/Pages/Departments";
import DepartmentDetails from "./components/Pages/DepartmentDetails";
import BlogDetails from "./components/Pages/BlogDetails";
import DoctorDetails from "./components/Pages/DoctorDetails";
import PricingPlan from "./components/Pages/PricingPlan";
import Gallery from "./components/Pages/Gallery";
import Timetable from "./components/Pages/Timetable";
import Contact from "./components/Pages/Contact";
import { useEffect } from "react";
import ErrorPage from "./components/Pages/ErrorPage";

import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import ForgotPassword from "./components/Pages/ForgotPassword";
import ResetPassword from "./components/Pages/ResetPassword";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:id/:token" element={<ResetPassword />} />

        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="doctors/:doctorId" element={<DoctorDetails />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:blogId" element={<BlogDetails />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="departments" element={<Departments />} />
        <Route
          path="departments/:departmentId"
          element={<DepartmentDetails />}
        />
        <Route path="pricing-plan" element={<PricingPlan />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
