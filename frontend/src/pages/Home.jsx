import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  Users,
  BookOpen,
  ShieldCheck,
  ClipboardList
} from "lucide-react";

import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      <section className="home-hero">
        <div className="hero-container">

          <div className="hero-content">
            <span className="hero-tag">
              <GraduationCap size={17} />
              Student Management Platform
            </span>

            <h1>
              Manage Students.
              <span> Simplify Education.</span>
            </h1>

            <p>
              A centralized platform to manage student information,
              maintain academic records and organize student details
              efficiently.
            </p>

            <div className="hero-buttons">
              <Link to="/students" className="hero-primary-btn">
                Explore Students <ArrowRight size={18} />
              </Link>

              <Link to="/about" className="hero-secondary-btn">
                Learn More
              </Link>
            </div>

            <div className="hero-trust">
              <ShieldCheck size={19} />
              <span>Simple, Organized and Efficient Management</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-main-card">

              <div className="hero-card-header">
                <div>
                  <small>STUDENT OVERVIEW</small>
                  <h3>Management Portal</h3>
                </div>

                <div className="hero-card-icon">
                  <GraduationCap size={25} />
                </div>
              </div>

              <div className="hero-stats">
                <div className="hero-stat-card">
                  <Users size={23} />
                  <h2>Students</h2>
                  <p>Student Records</p>
                </div>

                <div className="hero-stat-card">
                  <BookOpen size={23} />
                  <h2>Courses</h2>
                  <p>Academic Details</p>
                </div>
              </div>

              <div className="hero-card-bottom">
                <ClipboardList size={22} />
                <div>
                  <strong>Student Records</strong>
                  <p>Manage information in one place</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <section className="home-features">
        <div className="section-heading">
          <span>OUR PLATFORM</span>
          <h2>Everything You Need to Manage Students</h2>
          <p>
            Simple tools to organize and manage student information.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon blue">
              <Users size={25} />
            </div>
            <h3>Student Records</h3>
            <p>
              View and maintain student information through
              a centralized management system.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple">
              <ClipboardList size={25} />
            </div>
            <h3>Easy Management</h3>
            <p>
              Add, update, view and delete student records
              through simple operations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">
              <ShieldCheck size={25} />
            </div>
            <h3>Admin Access</h3>
            <p>
              Dedicated admin login and dashboard
              for managing student information.
            </p>
          </div>

        </div>
      </section>

      <section className="home-cta">
        <div>
          <h2>Ready to Explore Student Records?</h2>
          <p>Access the student management section to get started.</p>
        </div>

        <Link to="/students">
          View Students <ArrowRight size={18} />
        </Link>
      </section>

    </div>
  );
}

export default Home;