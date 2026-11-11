import React from "react";
import { GraduationCap, Target, Eye, ShieldCheck } from "lucide-react";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      <section className="about-banner">
        <span>ABOUT OUR PLATFORM</span>
        <h1>About StudentHub</h1>
        <p>
          Making student information management simple,
          organized and efficient.
        </p>
      </section>

      <section className="about-content">

        <div className="about-intro">
          <div className="about-icon">
            <GraduationCap size={38} />
          </div>

          <div>
            <h2>Student Management System</h2>
            <p>
              StudentHub is a web-based student management platform
              designed to organize student records in one place.
              It provides a simple interface to create, view, update
              and manage student information.
            </p>
          </div>
        </div>

        <div className="about-cards">

          <div className="about-card">
            <Target size={30} />
            <h3>Our Mission</h3>
            <p>
              To simplify student record management through
              an accessible and user-friendly platform.
            </p>
          </div>

          <div className="about-card">
            <Eye size={30} />
            <h3>Our Vision</h3>
            <p>
              To provide an organized digital environment
              for managing student information.
            </p>
          </div>

          <div className="about-card">
            <ShieldCheck size={30} />
            <h3>Our Approach</h3>
            <p>
              Deliver simple management tools with
              dedicated administrator access.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default About;