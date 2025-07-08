// import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
      <ul className="footer-links">
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Terms</a>
        </li>
        <li>
          <a href="#">Support</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
