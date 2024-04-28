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
import Login from "./pages/login/Login.jsx";
import Profile from "./components/doctorsProfile/Profile.jsx";
import AddDoctor from "./components/addDoctorForm/AddDoctors.jsx";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            {/* <QueryClientProvider client={queryClient}> */}
            <Outlet />
            {/* </QueryClientProvider> */}
          </div>
        </div>
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
        <Route path="login" element={<Login />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
