import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          © 2025 Learn2Play Platform. All rights reserved.
          <br />
          Crafted with ❤️ by{" "}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Learn2Play Team
          </a>
        </p>
        <div className="social-links">
          <a href="#" aria-label="Facebook">
            <AiFillFacebook />
          </a>
          <a href="#" aria-label="Twitter">
            <AiFillTwitterSquare />
          </a>
          <a href="#" aria-label="Instagram">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
