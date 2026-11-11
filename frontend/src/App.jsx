import React from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Students from "./pages/Students";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// 404 Page
function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "50px 20px",
      }}
    >
      <h1 style={{ fontSize: "48px", color: "#435cf5" }}>
        404
      </h1>

      <h2>Page Not Found</h2>

      <p style={{ color: "#777", marginTop: "10px" }}>
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

function App() {
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin-login" ||
    location.pathname.startsWith("/admin-dashboard");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <main>
        <Routes>

          {/* Public Pages */}
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/students" element={<Students />} />

          <Route path="/contact" element={<Contact />} />

          {/* Admin Login */}
          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

          {/* Protected Admin Dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin-dashboard"
              element={<AdminDashboard />}
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;