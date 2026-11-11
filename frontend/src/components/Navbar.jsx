import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GraduationCap, LogIn } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="main-navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <GraduationCap size={27} />
          </div>

          <div className="logo-text">
            <h2>Student<span>Hub</span></h2>
            <small>Management System</small>
          </div>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/students">Students</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <Link to="/admin-login" className="admin-login-btn">
          <LogIn size={17} />
          Admin Login
        </Link>

      </div>
    </header>
  );
}

export default Navbar;