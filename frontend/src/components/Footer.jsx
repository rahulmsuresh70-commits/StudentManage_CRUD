import React from "react";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="main-footer">

      <div className="footer-container">

        <div className="footer-brand">
          <div className="footer-logo">
            <GraduationCap size={27} />
            <h2>Student<span>Hub</span></h2>
          </div>

          <p>
            A simple and efficient student management platform
            designed to manage student information and academic records.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/students">Students</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h3>Contact Information</h3>

          <p><Mail size={16} /> support@studenthub.com</p>
          <p><Phone size={16} /> +91 98765 43210</p>
          <p><MapPin size={16} /> Kerala, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} StudentHub. All rights reserved.
        </p>
        <span>Student Management System</span>
      </div>

    </footer>
  );
}

export default Footer;