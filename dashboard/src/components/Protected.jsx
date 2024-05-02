import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from './loader/Loader';

export default function Protected({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const adminToken = Cookies.get("AdminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/login");
    } else {
      setIsLoading(false); // Set loading to false if token exists
    }
  }, [adminToken, navigate]);

  if (!adminToken || isLoading) {
    return <Loader/>; // Show loading or any other fallback UI
  }

  return <>{children}</>;
}
