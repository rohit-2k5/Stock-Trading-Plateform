import React, { useState, useEffect } from "react";
  import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });

  // 🔹 Redirect if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if the user is already authenticated
        await axios.get("https://stock-trading-plateform-backend.onrender.com/allHoldings", { withCredentials: true });
        // ✅ Redirect directly to the dashboard app
        window.location.href = "https://stock-trading-plateform-dashboard.onrender.com/";
      } catch {
        // user not logged in, stay on signup page
      }
    };
    checkAuth();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://stock-trading-plateform-backend.onrender.com/signup", data, {
        withCredentials: true,
      });
      
      if (res.data.success) {
        // ✅ Go directly to dashboard after successful signup
        window.location.href = "https://stock-trading-plateform-dashboard.onrender.com/";
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
          <h4 className="mt-3">Create your account</h4>
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
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={data.username}
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
            Signup
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
