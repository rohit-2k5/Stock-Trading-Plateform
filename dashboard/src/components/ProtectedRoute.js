import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Checking authentication...");
        const response = await axios.get("https://stock-trading-plateform-backend.onrender.com/allHoldings", { withCredentials: true });
        console.log("✅ Authentication successful:", response.data);
        setAuthenticated(true);
      } catch (error) {
        console.log("❌ Authentication failed:", error.response?.status, error.response?.data);
        setAuthenticated(false);
        // Redirect to external login page
        window.location.href = "https://stock-trading-plateform-frontend.onrender.com/login";
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return authenticated ? children : null;
};

export default ProtectedRoute;
