import React from "react";
import SpotMeUpLogo from "../../assets/icons/logo.svg";

const Footer = () => {
  return (
    <div className="footer-big-container">
      <div className="footer-divider">
        <img src={SpotMeUpLogo} alt="spotmeup-logo" />

        <div className="footer-links-divider">
          <h1>Buyer Guarantee</h1>
          <h1>About Us</h1>
          <h1>Promote Event</h1>
          <h1>Socials</h1>
        </div>
      </div>


      <div className="footer-divider light-text">
        <h1>©️ 2024 Spot Me Up. All Rights Reserved.</h1>
        <h1 className="footer-terms-service">Terms of Service Privacy Policy</h1>
      </div>
    </div>
  );
};

export default Footer;
