import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
LayoutDashboard,
Users,
GraduationCap,
UserRound,
LogOut,
Menu,
X,
User,
Mail,
BookOpen,
UsersRound,
ShieldCheck,
ArrowUpRight,
RefreshCw,
} from "lucide-react";

import Students from "./Students";
import "./AdminDashboard.css";

const STUDENTS_API = "http://127.0.0.1:8000/api/students/";
const PROFILE_API = "http://127.0.0.1:8000/api/auth/profile/";
const LOGOUT_API = "http://127.0.0.1:8000/api/auth/logout/";

function AdminDashboard() {
const navigate = useNavigate();

const [activeSection, setActiveSection] = useState("dashboard");
const [students, setStudents] = useState([]);
const [admin, setAdmin] = useState(null);
const [loading, setLoading] = useState(true);
const [profileLoading, setProfileLoading] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [error, setError] = useState("");

const accessToken = localStorage.getItem("admin_access_token");
const refreshToken = localStorage.getItem("admin_refresh_token");

const authConfig = {
headers: {
Authorization: `Bearer ${accessToken}`,
},
};

// Fetch students
const fetchStudents = async () => {
try {
setLoading(true);
setError("");


  const response = await axios.get(STUDENTS_API);

  const data = response.data;
  setStudents(Array.isArray(data) ? data : data.results || []);
} catch (err) {
  console.error("Student fetching error:", err);
  setError("Unable to load student information.");
} finally {
  setLoading(false);
}

};

// Fetch admin profile
const fetchAdminProfile = async () => {
try {
setProfileLoading(true);


  const response = await axios.get(PROFILE_API, authConfig);

  setAdmin(response.data);
  localStorage.setItem("admin_user", JSON.stringify(response.data));
} catch (err) {
  console.error("Admin profile error:", err);

  if (err.response?.status === 401) {
    setError("Your session has expired. Please log in again.");
  }
} finally {
  setProfileLoading(false);
}


};

useEffect(() => {
fetchStudents();
fetchAdminProfile();
// Initial dashboard loading only.
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// Statistics
const totalStudents = students.length;

const maleStudents = students.filter(
(student) => student.gender?.toLowerCase() === "male"
).length;

const femaleStudents = students.filter(
(student) => student.gender?.toLowerCase() === "female"
).length;

const courses = [
...new Set(
students
.map((student) => student.course)
.filter(Boolean)
),
];

const recentStudents = [...students]
.reverse()
.slice(0, 5);

// Navigation
const handleNavigation = (section) => {
setActiveSection(section);
setSidebarOpen(false);


if (section === "profile") {
  fetchAdminProfile();
}


};

// Logout
const handleLogout = async () => {
const confirmed = window.confirm(
"Are you sure you want to logout?"
);


if (!confirmed) return;

try {
  await axios.post(
    LOGOUT_API,
    { refresh: refreshToken },
    authConfig
  );
} catch (err) {
  console.error("Logout request error:", err.response?.data || err);
} finally {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
  localStorage.removeItem("admin_user");

  navigate("/admin-login", { replace: true });
}


};

const adminName =
admin?.first_name || admin?.username || admin?.email || "Administrator";

const adminEmail = admin?.email || "Admin Account";

return ( <div className="admin-dashboard-layout">

  {/* MOBILE OVERLAY */}
  {sidebarOpen && (
    <div
      className="admin-sidebar-overlay"
      onClick={() => setSidebarOpen(false)}
    />
  )}

  {/* SIDEBAR */}
  <aside
    className={`admin-sidebar ${
      sidebarOpen ? "admin-sidebar-open" : ""
    }`}
  >
    <div className="admin-sidebar-brand">
      <div className="admin-sidebar-logo">
        <GraduationCap size={27} />
      </div>

      <div>
        <h2>Student</h2>
        <span>Management System</span>
      </div>

      <button
        className="admin-sidebar-close"
        onClick={() => setSidebarOpen(false)}
        aria-label="Close sidebar"
      >
        <X size={21} />
      </button>
    </div>

    <div className="admin-sidebar-label">
      MAIN MENU
    </div>

    <nav className="admin-sidebar-nav">

      <button
        className={activeSection === "dashboard" ? "active" : ""}
        onClick={() => handleNavigation("dashboard")}
      >
        <LayoutDashboard size={19} />
        <span>Dashboard</span>
      </button>

      <button
        className={activeSection === "students" ? "active" : ""}
        onClick={() => handleNavigation("students")}
      >
        <Users size={19} />
        <span>Student Management</span>
      </button>

    </nav>

    <div className="admin-sidebar-label admin-sidebar-account-label">
      ACCOUNT
    </div>

    <nav className="admin-sidebar-nav">

      <button
        className={activeSection === "profile" ? "active" : ""}
        onClick={() => handleNavigation("profile")}
      >
        <UserRound size={19} />
        <span>Admin Profile</span>
      </button>

      <button
        className="admin-sidebar-logout"
        onClick={handleLogout}
      >
        <LogOut size={19} />
        <span>Logout</span>
      </button>

    </nav>

    <div className="admin-sidebar-bottom">
      <div className="admin-sidebar-avatar">
        <ShieldCheck size={21} />
      </div>

      <div>
        <strong>Administrator</strong>
        <span>Authorized Account</span>
      </div>
    </div>
  </aside>

  {/* MAIN AREA */}
  <div className="admin-main-area">

    {/* TOP HEADER */}
    <header className="admin-topbar">

      <div className="admin-topbar-left">
        <button
          className="admin-mobile-menu"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={23} />
        </button>

        <div>
          <span className="admin-topbar-subtitle">
            STUDENT MANAGEMENT SYSTEM
          </span>

          <h1>
            {activeSection === "dashboard" && "Dashboard"}
            {activeSection === "students" && "Student Management"}
            {activeSection === "profile" && "Admin Profile"}
          </h1>
        </div>
      </div>

      <div className="admin-topbar-user">
        <div className="admin-topbar-user-icon">
          <UserRound size={21} />
        </div>

        <div className="admin-topbar-user-info">
          <strong>{adminName}</strong>
          <span>Administrator</span>
        </div>
      </div>

    </header>

    {/* CONTENT */}
    <main className="admin-dashboard-content">

      {/* DASHBOARD OVERVIEW */}
      {activeSection === "dashboard" && (
        <div className="admin-overview-section">

          <div className="admin-welcome-card">
            <div>
              <span>ADMINISTRATION OVERVIEW</span>

              <h2>
                Welcome back, {admin?.first_name || "Administrator"}!
              </h2>

              <p>
                Manage student records and monitor your institution's
                student information from one place.
              </p>

              <button
                onClick={() => handleNavigation("students")}
              >
                Manage Students
                <ArrowUpRight size={17} />
              </button>
            </div>

            <div className="admin-welcome-illustration">
              <GraduationCap size={85} />
            </div>
          </div>

          <div className="admin-section-heading">
            <div>
              <h2>Dashboard Overview</h2>
              <p>Summary of your student records.</p>
            </div>

            <button
              className="admin-refresh-button"
              onClick={fetchStudents}
              disabled={loading}
            >
              <RefreshCw
                size={16}
                className={loading ? "admin-spinning" : ""}
              />
              Refresh
            </button>
          </div>

          {error && (
            <div className="admin-dashboard-error">
              {error}
            </div>
          )}

          {/* STATISTICS */}
          <div className="admin-statistics-grid">

            <div className="admin-stat-card">
              <div className="admin-stat-top">
                <div className="admin-stat-icon blue">
                  <UsersRound size={23} />
                </div>
                <span>ALL STUDENTS</span>
              </div>

              <h3>
                {loading ? "..." : totalStudents}
              </h3>

              <p>Total registered students</p>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-top">
                <div className="admin-stat-icon purple">
                  <UserRound size={23} />
                </div>
                <span>MALE STUDENTS</span>
              </div>

              <h3>
                {loading ? "..." : maleStudents}
              </h3>

              <p>Registered male students</p>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-top">
                <div className="admin-stat-icon pink">
                  <UserRound size={23} />
                </div>
                <span>FEMALE STUDENTS</span>
              </div>

              <h3>
                {loading ? "..." : femaleStudents}
              </h3>

              <p>Registered female students</p>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-top">
                <div className="admin-stat-icon green">
                  <BookOpen size={23} />
                </div>
                <span>TOTAL COURSES</span>
              </div>

              <h3>
                {loading ? "..." : courses.length}
              </h3>

              <p>Different courses available</p>
            </div>

          </div>

          {/* RECENT STUDENTS */}
          <div className="admin-recent-students-card">

            <div className="admin-recent-heading">
              <div>
                <h2>Recent Students</h2>
                <p>Recently displayed student records.</p>
              </div>

              <button
                onClick={() => handleNavigation("students")}
              >
                View All
                <ArrowUpRight size={16} />
              </button>
            </div>

            {loading ? (
              <div className="admin-empty-state">
                Loading student records...
              </div>
            ) : recentStudents.length === 0 ? (
              <div className="admin-empty-state">
                <Users size={35} />
                <h3>No students available</h3>
                <p>Add students to see their records here.</p>
              </div>
            ) : (
              <div className="admin-recent-table-wrapper">
                <table className="admin-recent-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Student ID</th>
                      <th>Email</th>
                      <th>Course</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentStudents.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <div className="admin-recent-student">
                            <div className="admin-student-avatar">
                              {(student.first_name || "S")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <strong>
                              {student.first_name} {student.last_name}
                            </strong>
                          </div>
                        </td>

                        <td>{student.student_id || "-"}</td>
                        <td>{student.email || "-"}</td>
                        <td>{student.course || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>

        </div>
      )}

      {/* STUDENT MANAGEMENT */}
      {activeSection === "students" && (
        <div className="admin-student-management">
          <Students />
        </div>
      )}

      {/* ADMIN PROFILE */}
      {activeSection === "profile" && (
        <div className="admin-profile-section">

          <div className="admin-profile-heading">
            <h2>Administrator Profile</h2>
            <p>View your administrator account information.</p>
          </div>

          {profileLoading ? (
            <div className="admin-profile-loading">
              Loading profile...
            </div>
          ) : (
            <div className="admin-profile-card">

              <div className="admin-profile-cover">
                <div className="admin-profile-avatar">
                  <UserRound size={45} />
                </div>
              </div>

              <div className="admin-profile-details">

                <div className="admin-profile-name">
                  <h2>
                    {admin?.first_name || admin?.username || "Administrator"}
                    {admin?.last_name ? ` ${admin.last_name}` : ""}
                  </h2>

                  <span>
                    <ShieldCheck size={15} />
                    Administrator
                  </span>
                </div>

                <div className="admin-profile-information">

                  <div className="admin-profile-info-item">
                    <div className="admin-profile-info-icon">
                      <User size={19} />
                    </div>

                    <div>
                      <span>Username</span>
                      <strong>{admin?.username || "-"}</strong>
                    </div>
                  </div>

                  <div className="admin-profile-info-item">
                    <div className="admin-profile-info-icon">
                      <Mail size={19} />
                    </div>

                    <div>
                      <span>Email Address</span>
                      <strong>{admin?.email || "-"}</strong>
                    </div>
                  </div>

                  <div className="admin-profile-info-item">
                    <div className="admin-profile-info-icon">
                      <ShieldCheck size={19} />
                    </div>

                    <div>
                      <span>Account Role</span>
                      <strong>{admin?.role || "Administrator"}</strong>
                    </div>
                  </div>

                  <div className="admin-profile-info-item">
                    <div className="admin-profile-info-icon">
                      <GraduationCap size={19} />
                    </div>

                    <div>
                      <span>Account Status</span>
                      <strong className="admin-account-active">
                        {admin?.is_active === false ? "Inactive" : "Active"}
                      </strong>
                    </div>
                  </div>

                </div>

                <div className="admin-profile-footer">
                  <ShieldCheck size={18} />
                  Your account is protected by administrator authentication.
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </main>

  </div>
</div>


);
}

export default AdminDashboard;
