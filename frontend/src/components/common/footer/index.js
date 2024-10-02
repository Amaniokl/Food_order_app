import React from "react";
import "./footer.css"; // Make sure to create and link this CSS file

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-logo">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" // Zomato logo image
            alt="Zomato Logo"
            className="logo-img"
          />
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h3>ABOUT ZOMATO</h3>
            <ul>
              <li>
                <a href="#">Who We Are</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Work With Us</a>
              </li>
              <li>
                <a href="#">Investor Relations</a>
              </li>
              <li>
                <a href="#">Report Fraud</a>
              </li>
              <li>
                <a href="#">Press Kit</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>ZOMAVERSE</h3>
            <ul>
              <li>
                <a href="#">Zomato</a>
              </li>
              <li>
                <a href="#">Blinkit</a>
              </li>
              <li>
                <a href="#">Feeding India</a>
              </li>
              <li>
                <a href="#">Hyperpure</a>
              </li>
              <li>
                <a href="#">Zomato Live</a>
              </li>
              <li>
                <a href="#">Zomaland</a>
              </li>
              <li>
                <a href="#">Weather Union</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>FOR RESTAURANTS</h3>
            <ul>
              <li>
                <a href="#">Partner With Us</a>
              </li>
              <li>
                <a href="#">Apps For You</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>LEARN MORE</h3>
            <ul>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-social">
          <h3>SOCIAL LINKS</h3>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
          <div className="footer-apps">
            <a href="#">
              <img
                src="https://e7.pngegg.com/pngimages/912/1019/png-clipart-app-store-google-play-apple-apple-text-logo.png"
                alt="Google Play"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy, and Content Policies. &copy; 2024
          Zomato™ Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;