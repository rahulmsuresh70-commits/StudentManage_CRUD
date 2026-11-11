import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Contact form submitted successfully.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">

      <section className="contact-banner">
        <span>GET IN TOUCH</span>
        <h1>Contact Us</h1>
        <p>Have a question? Send us a message.</p>
      </section>

      <section className="contact-container">

        <div className="contact-information">
          <h2>Let's Connect</h2>
          <p>
            Contact our support team for assistance
            regarding the StudentHub platform.
          </p>

          <div className="contact-info-item">
            <Mail />
            <div>
              <strong>Email</strong>
              <span>support@studenthub.com</span>
            </div>
          </div>

          <div className="contact-info-item">
            <Phone />
            <div>
              <strong>Phone</strong>
              <span>+91 98765 43210</span>
            </div>
          </div>

          <div className="contact-info-item">
            <MapPin />
            <div>
              <strong>Location</strong>
              <span>Kerala, India</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          <div className="contact-form-row">
            <div>
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <label>Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            rows="5"
            required
          />

          <button type="submit">
            Send Message <Send size={17} />
          </button>
        </form>

      </section>

    </div>
  );
}

export default Contact;