import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ShieldCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
  ArrowRight,
  AlertCircle,
  GraduationCap,
} from "lucide-react";

import "./AdminLogin.css";

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api";

const LOGIN_API = `${API_URL.replace(/\/+$/, "")}/auth/login/`;
const PROFILE_API = `${API_URL.replace(/\/+$/, "")}/auth/profile/`;

function AdminLogin() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username.trim() || !credentials.password) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Step 1: Obtain JWT tokens
      const response = await axios.post(
        LOGIN_API,
        {
          username: credentials.username.trim(),
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 15000,
        }
      );

      const { access, refresh } = response.data;

      if (!access || !refresh) {
        throw new Error("Valid authentication tokens were not received.");
      }

      // Step 2: Verify admin profile
      const profileResponse = await axios.get(PROFILE_API, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const userData = profileResponse.data;

      // Step 3: Store tokens and user information
      localStorage.setItem("admin_access_token", access);
      localStorage.setItem("admin_refresh_token", refresh);
      localStorage.setItem("admin_user", JSON.stringify(userData));

      // Step 4: Navigate to dashboard
      navigate("/admin-dashboard", { replace: true });

    } catch (err) {
      console.error(
        "Admin login error:",
        err.response?.data || err.message
      );

      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_refresh_token");
      localStorage.removeItem("admin_user");

      if (err.response) {
        const data = err.response.data;

        if (data.detail) {
          setError(
            typeof data.detail === "string"
              ? data.detail
              : "Invalid username or password."
          );
        } else if (data.username) {
          setError("Please check your username.");
        } else if (data.password) {
          setError("Please check your password.");
        } else {
          setError("Login failed. Please check your credentials and admin permissions.");
        }
      } else if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please try again.");
      } else if (err.request) {
        setError("Cannot connect to Django server. Check whether the backend is running.");
      } else {
        setError(err.message || "Something went wrong.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">

        <div className="admin-login-left">
          <div className="admin-login-brand">
            <div className="admin-brand-icon">
              <GraduationCap size={30} />
            </div>
            <span>Student Management</span>
          </div>

          <div className="admin-login-content">
            <span className="admin-welcome-tag">
              <ShieldCheck size={16} />
              ADMINISTRATOR ACCESS
            </span>

            <h1>
              Manage your institution
              <span> with confidence.</span>
            </h1>

            <p>
              Access your administration dashboard to manage student
              records and monitor student information from one place.
            </p>

            <div className="admin-login-feature">
              <div className="admin-feature-icon">
                <ShieldCheck size={21} />
              </div>
              <div>
                <h4>Secure Administration</h4>
                <p>Protected access for authorized administrators.</p>
              </div>
            </div>

            <div className="admin-login-feature">
              <div className="admin-feature-icon">
                <UserRound size={21} />
              </div>
              <div>
                <h4>Student Management</h4>
                <p>Manage student information in one dashboard.</p>
              </div>
            </div>
          </div>

          <div className="admin-login-left-footer">
            © 2026 Student Management System
          </div>
        </div>

        <div className="admin-login-right">
          <div className="admin-login-form-wrapper">

            <div className="admin-mobile-logo">
              <GraduationCap size={30} />
            </div>

            <span className="admin-form-label">ADMIN PORTAL</span>

            <h2>Welcome back</h2>

            <p className="admin-form-description">
              Sign in to access your administrator account.
            </p>

            {error && (
              <div className="admin-login-error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label htmlFor="username">Username</label>

                <div className="admin-input-wrapper">
                  <UserRound size={19} />

                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label htmlFor="password">Password</label>

                <div className="admin-input-wrapper">
                  <LockKeyhole size={19} />

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="admin-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="admin-login-button"
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </form>

            <div className="admin-login-security">
              <ShieldCheck size={17} />
              <span>
                Your administrator session is securely authenticated.
              </span>
            </div>

            <button
              type="button"
              className="admin-back-home"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;