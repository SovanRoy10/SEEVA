import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "./sass/index.scss";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/context";
import { SkeletonTheme } from "react-loading-skeleton";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
      <UserProvider>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </UserProvider>
    </SkeletonTheme>
  </React.StrictMode>
);
