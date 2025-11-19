import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // 🔹 Logout function
  const handleLogout = async () => {
    try {
      await axios.post("https://stock-trading-plateform-backend.onrender.com/logout", {}, { withCredentials: true });
      window.location.href = "https://stock-trading-plateform-frontend.onrender.com/login"; // redirect to login page in frontend
    } catch (err) {
      console.error("Logout failed:", err);
      alert("⚠️ Something went wrong during logout!");
    }
  };

  // CSS classes for selected menu
  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="x" style={{ width: "40px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to={"/"} onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to={"/orders"} onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to={"/holdings"} onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to={"/positions"} onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to={"/funds"} onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to={"/apps"} onClick={() => handleMenuClick(5)}>
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />

        {/* Profile Section */}
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>

        {/* Dropdown menu */}
        {/* Dropdown */}
        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <p className="dropdown-item">My Account</p>
            <p className="dropdown-item">Settings</p>
            <p className="dropdown-item logout" onClick={handleLogout}>
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
