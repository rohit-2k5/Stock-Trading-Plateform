import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("https://stock-trading-plateform-backend.onrender.com/allHoldings", { withCredentials: true });
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return authenticated ? children : <Navigate to="https://stock-trading-plateform-frontend.onrender.com/login" />;
};

export default ProtectedRoute;
