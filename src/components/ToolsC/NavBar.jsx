import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpotMeUpIcon from "./SpotMeUpIcon";

import homeIcon from "../../assets/home_icon.svg";
import promotersIcon from "../../assets/promoters_icon.svg";
import profileIcon from "../../assets/profile_icon.svg";

import { AuthContext } from "../../context/auth.context";
import { authenticateUser } from "../../services/auth.service";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const userValidation = async () => {
    try {
      const response = await authenticateUser();
      console.log("authenticate user:", response);
    } catch (error) {
      console.log("Authenticate User Error:", error);
    }
  };

  const removeToken = () => {
    console.log("Token Removed");
    localStorage.removeItem("authToken");
    authenticateUser(); // Llamar a la función de autenticación para actualizar el estado
    navigate("/");
  };

  const handleLogout = () => {
    removeToken();
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-subcontainer">
        <div className="home-icon-container">
          {/* 
          <Link to="/">
            <img src={homeIcon}  alt="home-icon"/>
            <svg
              width="28"
              height="32"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="home-icon"
            >
              <path
                d="M2 30H9.384V18.232H18.616V30H26V12L14 2.92401L2 12V30ZM0 32V11L14 0.424011L28 11V32H16.616V20.232H11.384V32H0Z"
                fill="black"
              />
            </svg>
          </Link>

           */}

          <Link to="/" className="navlink">
            Home
          </Link>
        </div>

        <div className="promoters-link promoters-icon-container">
          <Link to={isLoggedIn ? "/myevents" : "/signup"} className="navlink">
            Promoters
          </Link>
        </div>
        <div className="about-link">
          <Link to="/about" className="navlink">
            About Us
          </Link>
        </div>
        <div className="profile-icon-container">
          <Link to="/profile" className="navlink">
            Profile
          </Link>
        </div>
        <div className="profile-icon-container">
          <Link to="/view-tickets" className="navlink">
            Tickets
          </Link>
        </div>

        {/* <div>
          <Link to="/" className="navlink">
            Places
          </Link>
        </div> */}

        {!isLoggedIn ? (
          <div className="nav-img-container log-link">
            <Link to="/login" className="navlink-signup">
              {/* <div className="nav-user-img"></div> */}
              <h1
                className="login-signup-navtext"
                // onClick={isLoggedIn ? removeToken() : ""}
              >
                "Log In or Sign Up"
              </h1>
            </Link>
          </div>
        ) : (
          <button className="login-signup-navtext" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
