import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.get("https://stock-trading-plateform-backend.onrender.com/allOrders", {
          withCredentials: true, // ✅ send cookie for authentication
        });
        setAllOrders(result.data);
      } catch (err) {
        console.error("Error fetching orders:", err);

        // If unauthorized, redirect to login page
        if (err.response && err.response.status === 401) {
          alert("⚠️ You must be logged in to view your orders.");
          window.location.href = "https://stock-trading-plateform-frontend.onrender.com/login";
        }
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Orders</h2>

      {allOrders.length === 0 ? (
        <div className="text-center">
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      ) : (
        <div className="row">
          {allOrders.map((order, index) => (
            <div className="col-md-4 mb-3" key={order._id || index}>
              <div className="card shadow-sm p-3">
                <h5>Mode: {order.mode || "N/A"}</h5>
                <p>Quantity: {order.qty}</p>
                <p>Price: ₹{order.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
