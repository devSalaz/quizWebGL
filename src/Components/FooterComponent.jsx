import React from "react";
import {
  IoLogoLinkedin,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";

//Styles
import "../assets/Styles/footerStyles.css";

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="content">
        <div className="info">
          <p>
            &copy; {currentYear} Andrés Felipe Salazar - From Bogotá, Colombia
          </p>
        </div>
        <div className="social">
          <a href="https://www.linkedin.com/in/andres-salaz/" target="_blank">
            <IoLogoLinkedin size="1.25rem" className="icon" />
          </a>
          <a href="https://www.instagram.com/el.salaz/" target="_blank">
            <IoLogoInstagram size="1.25rem" className="icon" />
          </a>
          <a href="https://x.com/DevSalaz" target="_blank">
            <IoLogoTwitter size="1.25rem" className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
