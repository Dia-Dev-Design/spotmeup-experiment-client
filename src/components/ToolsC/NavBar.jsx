import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpotMeUpIcon from "./SpotMeUpIcon";

import homeIcon from "../../assets/home_icon.svg";
import promotersIcon from "../../assets/promoters_icon.svg";
import profileIcon from "../../assets/profile_icon.svg";

import SpotMeUpLogo from "../../assets/icons/logo.svg";

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
      <img
        src={SpotMeUpLogo}
        alt="spotmeup-logo"
        className="logo-new-spotmeup"
      />

      <div className="w-[300px] h-12 p-2 bg-neutral-700 rounded-[50px] justify-start items-center gap-2 inline-flex">
        <div className="w-8 h-8 relative bg-[#d4af37] rounded-[100px] backdrop-blur-[10px]" />
        <div className="grow shrink basis-0 text-neutral-100 text-base font-light font-['Inter']">
          Search events, artists, or venues
        </div>
      </div>

      <div className="w-[157px] h-12 p-2 bg-neutral-700 rounded-[50px] justify-start items-center gap-2 inline-flex">
        <div className="w-8 h-8 relative bg-[#d4af37] rounded-[100px]" />
        <div className="grow shrink basis-0 text-neutral-100 text-base font-light font-['Inter']">
          Location
        </div>
      </div>

      <div></div>
      <div className="navbar-subcontainer">
        <div className="about-link">
          <Link to="/about" className="navlink">
            Browse Events
          </Link>
        </div>

        <div className="about-link">
          <Link to="/about" className="navlink">
            About
          </Link>
        </div>
        {/* <div className="profile-icon-container">
          <Link to="/profile" className="navlink">
            Profile
          </Link>
        </div> */}
        {/* <div className="profile-icon-container">
          <Link to="/view-tickets" className="navlink">
            Tickets
          </Link>
        </div> */}

        {/* <div>
          <Link to="/" className="navlink">
          Places
          </Link>
          </div> */}

        {!isLoggedIn ? (
          <div className="log-linkss">
            <Link to="/login" className="navlink">
              {/* <div className="nav-user-img"></div> */}
              <h1
                className="navlink"
                // onClick={isLoggedIn ? removeToken() : ""}
              ></h1>
              Log In
            </Link>
          </div>
        ) : (
          <button className="login-signup-navtext" onClick={handleLogout}>
            Log Out
          </button>
        )}
        <div className="promoters-link promoters-icon-container">
          <Link
            to={isLoggedIn ? "/myevents" : "/signup"}
            className="navlink nav-btn"
          >
            HOST AN EVENT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
