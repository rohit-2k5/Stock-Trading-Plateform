import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  // Redirect if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("https://stock-trading-plateform-backend.onrender.com/allHoldings", { withCredentials: true });
        window.location.href = "https://stock-trading-plateform-dashboard.onrender.com/"; // ✅ Go to dashboard
      } catch {
        console.log("Not logged in"); // stays on login
      }
    };
    checkAuth();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("➡️ handleSubmit triggered"); // First log

  try {
    console.log("➡️ Sending data:", data); // Show the email & password you're sending

    const res = await axios.post("https://stock-trading-plateform-backend.onrender.com/login", data, {
      withCredentials: true,
    });

    console.log("➡️ API Response:", res.data);

    if (res.data.success) {
      window.location.href = "https://stock-trading-plateform-dashboard.onrender.com/"; // Redirect to dashboard
    } else {
      alert(res.data.message);
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    alert("Something went wrong! Check console for details.");
  }
};


  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "10px" }}
      >
        <div className="text-center mb-4">
          <img
            src="media/images/logo.svg"
            alt="Zerodha Logo"
            style={{ width: "120px" }}
          />
          <h4 className="mt-3">Login to your account</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              value={data.email}
              onChange={handleChange}
              required
              style={{ padding: "10px" }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
              style={{ padding: "10px" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ padding: "10px", fontWeight: "bold" }}
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
