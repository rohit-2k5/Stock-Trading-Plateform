import { Link , NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";

function Navbar() {
  const [selectedNavItem, setSelectedNavItem] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check login status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("https://stock-trading-plateform-backend.onrender.com/allHoldings", {
          withCredentials: true,
        });
        setIsLoggedIn(true); // user is logged in
      } catch {
        setIsLoggedIn(false); // user is not logged in
      }
    };
    checkAuth();
  }, []);


  const handleNavItemClick = (index) => {
    setSelectedNavItem(index);
  }

  return (
    <div className="mb-5">
      <nav
        className="fixed-top navbar navbar-expand-lg border-bottom shadow-sm"
        style={{
          backgroundColor: "#fff",
          height: "4rem",
          boxShadow: "0 0 1px 0 rgba(128, 128, 128, 0.5)",
        }}
      >
        <div className="container">
          <Link onClick={() => handleNavItemClick(-1)} className="navbar-brand" to={"/"}>
            <img
              style={{ width: "20%", marginLeft: "4rem" }}
              src="media/images/logo.svg"
              alt="logo"
            ></img>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search">
              <ul className="navbar-nav">
                {!isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <NavLink 
                        to={'/signup'}
                        onClick={() => handleNavItemClick(0)}  
                        className={({isActive}) => classNames("nav-link", { "selected-nav-item": isActive })}
                      >
                        <span className={ selectedNavItem===0 ? "selected-nav-item" : ""}>Signup</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink 
                        to={"/login"}
                        onClick={() => handleNavItemClick(1)} 
                        className={({isActive}) => classNames("nav-link", { "selected-nav-item": isActive })}
                      >
                        <span className={ selectedNavItem===1 ? "selected-nav-item" : ""}>Login</span>
                      </NavLink>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <NavLink 
                    to={"/about"}
                    onClick={() => handleNavItemClick(2)} 
                    className={({isActive}) => classNames("nav-link", { "selected-nav-item": isActive })} 
                  >
                    <span className={ selectedNavItem===2 ? "selected-nav-item" : ""}>About</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to={"/product"}
                    onClick={() => handleNavItemClick(3)} 
                    className={({isActive}) => classNames("nav-link", { "selected-nav-item": isActive })}
                  >
                    <span className={ selectedNavItem===3 ? "selected-nav-item" : ""}>Product</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to={"/pricing"}
                    onClick={() => handleNavItemClick(4)} 
                    className={({isActive}) => classNames("nav-link", { "selected-nav-item": isActive })} 
                  >
                    <span className={ selectedNavItem===4 ? "selected-nav-item" : ""}>Pricing</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to={"/support"}
                    onClick={() => handleNavItemClick(5)} 
                    className={({isActive}) => classNames("nav-link", { "selected-nav-item": isActive })} 
                  >
                    <span className={ selectedNavItem===5 ? "selected-nav-item" : ""}>Support</span>
                  </NavLink>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
