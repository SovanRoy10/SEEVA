import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from './loader/Loader';
import { useSelector } from "react-redux";

export default function Protected({ children }) {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  // const adminToken = Cookies.get("AdminToken");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setIsLoading(false); // Set loading to false if token exists
    }
  }, [user, navigate]);

  if (!user || isLoading) {
    return <Loader/>; // Show loading or any other fallback UI
  }

  return <>{children}</>;
}
