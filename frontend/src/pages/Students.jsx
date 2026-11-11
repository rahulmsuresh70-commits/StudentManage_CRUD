import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Users,
  Pencil,
  Trash2,
  Eye,
  X,
  RefreshCw,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  UserRound,
  BookOpen,
} from "lucide-react";
import "./Students.css";
import { getStudents } from "../services/studentService";

const API_URL =`${import.meta.env.VITE_API_URL}/students/`;
const emptyForm = {
  student_id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  gender: "",
  course: "",
  address: "",
  date_of_birth: "",
};

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  
const fetchStudents = async () => {
    setLoading(true);
    setError("");

    try {
        const data = await getStudents();

        // Supports normal arrays and paginated DRF responses
        const studentsData = Array.isArray(data)
            ? data
            : data.results || [];

        setStudents(studentsData);

    } catch (err) {
        console.error("Student fetch error:", err);

        setError(
            err.response?.data?.detail ||
            "Unable to load students. Please check whether the Django backend is running."
        );
    } finally {
        setLoading(false);
    }
};

  const filteredStudents = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return students;

    return students.filter((student) => {
      const searchableValues = [
        student.student_id,
        student.first_name,
        student.last_name,
        student.email,
        student.phone,
        student.course,
      ];

      return searchableValues.some((value) =>
        String(value || "").toLowerCase().includes(searchText)
      );
    });
  }, [students, search]);

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const openEditForm = (student) => {
    setEditingId(student.id);

    setForm({
      student_id: student.student_id || "",
      first_name: student.first_name || "",
      last_name: student.last_name || "",
      email: student.email || "",
      phone: student.phone || "",
      gender: student.gender || "",
      course: student.course || "",
      address: student.address || "",
      date_of_birth: student.date_of_birth || "",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingId !== null) {
        await axios.put(`${API_URL}${editingId}/`, form);
        setSuccess("Student details updated successfully.");
      } else {
        await axios.post(API_URL, form);
        setSuccess("Student added successfully.");
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);

      await fetchStudents();
    } catch (err) {
      console.error("Student save error:", err);

      const responseData = err.response?.data;

      if (responseData && typeof responseData === "object") {
        const messages = Object.entries(responseData)
          .map(([field, messages]) => {
            const value = Array.isArray(messages)
              ? messages.join(", ")
              : String(messages);

            return `${field}: ${value}`;
          })
          .join(" | ");

        setError(messages || "Unable to save student details.");
      } else {
        setError("Unable to save student details. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.first_name} ${student.last_name}?`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await axios.delete(`${API_URL}${student.id}/`);

      setStudents((previous) =>
        previous.filter((item) => item.id !== student.id)
      );

      setSuccess("Student deleted successfully.");

      if (selectedStudent?.id === student.id) {
        setSelectedStudent(null);
        setShowDetails(false);
      }
    } catch (err) {
      console.error("Student delete error:", err);
      setError(
        err.response?.data?.detail ||
        "Unable to delete student. Please try again."
      );
    }
  };

  const openStudentDetails = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setSelectedStudent(null);
    setShowDetails(false);
  };

  return (
    <div className="students-page">
      <section className="students-page-banner">
        <div className="students-banner-content">
          <div>
            <span className="students-eyebrow">
              STUDENT MANAGEMENT
            </span>

            <h1>Manage Students</h1>

            <p>
              View, add, update and manage student information
              from one place.
            </p>
          </div>

          <div className="students-banner-icon">
            <GraduationCap size={55} />
          </div>
        </div>
      </section>

      <section className="students-main-container">

        <div className="students-overview-card">
          <div className="students-overview-icon">
            <Users size={25} />
          </div>

          <div>
            <span>Total Students</span>
            <h2>{students.length}</h2>
          </div>

          <div className="students-overview-description">
            <span>STUDENT RECORDS</span>
            <p>Currently available in the system</p>
          </div>
        </div>

        <div className="students-content-card">

          <div className="students-toolbar">
            <div className="students-toolbar-title">
              <h2>Student Records</h2>
              <p>Manage all registered student information.</p>
            </div>

            <button
              type="button"
              className="students-add-btn"
              onClick={openAddForm}
            >
              <Plus size={18} />
              Add Student
            </button>
          </div>

          {success && (
            <div className="students-alert students-alert-success">
              {success}
              <button
                type="button"
                onClick={() => setSuccess("")}
                aria-label="Close success message"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {error && (
            <div className="students-alert students-alert-error">
              {error}
              <button
                type="button"
                onClick={() => setError("")}
                aria-label="Close error message"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="students-search-row">
            <div className="students-search-box">
              <Search size={19} />
              <input
                type="text"
                placeholder="Search by name, ID, email, phone or course..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <button
              type="button"
              className="students-refresh-btn"
              onClick={fetchStudents}
              disabled={loading}
              title="Refresh student list"
            >
              <RefreshCw
                size={17}
                className={loading ? "students-spin" : ""}
              />
              Refresh
            </button>
          </div>

          <div className="students-table-wrapper">

            <table className="students-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="students-table-message">
                      <RefreshCw size={24} className="students-spin" />
                      <span>Loading student records...</span>
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="students-table-message">
                      <Users size={30} />
                      <strong>
                        {search
                          ? "No matching students found"
                          : "No student records available"}
                      </strong>
                      <span>
                        {search
                          ? "Try a different search term."
                          : "Click Add Student to create the first record."}
                      </span>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div className="students-name-cell">
                          <div className="students-avatar">
                            {student.first_name?.charAt(0)?.toUpperCase() || "S"}
                          </div>

                          <div>
                            <strong>
                              {student.first_name} {student.last_name}
                            </strong>
                            <span>Student</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="students-id-badge">
                          {student.student_id || `#${student.id}`}
                        </span>
                      </td>

                      <td>{student.email || "—"}</td>
                      <td>{student.phone || "—"}</td>

                      <td>
                        <span className="students-course-badge">
                          {student.course || "—"}
                        </span>
                      </td>

                      <td>
                        <div className="students-action-buttons">

                          <button
                            type="button"
                            className="students-view-action"
                            title="View details"
                            onClick={() => openStudentDetails(student)}
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            className="students-edit-action"
                            title="Edit student"
                            onClick={() => openEditForm(student)}
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            className="students-delete-action"
                            title="Delete student"
                            onClick={() => handleDelete(student)}
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>

          <div className="students-table-footer">
            <span>
              Showing {filteredStudents.length} of {students.length} students
            </span>
          </div>

        </div>
      </section>

      {/* ADD / EDIT STUDENT MODAL */}
      {showForm && (
        <div
          className="students-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <div className="students-modal students-form-modal">

            <div className="students-modal-header">
              <div>
                <span>STUDENT INFORMATION</span>
                <h2>{editingId !== null ? "Edit Student" : "Add New Student"}</h2>
                <p>
                  {editingId !== null
                    ? "Update the student's information below."
                    : "Enter the details to register a new student."}
                </p>
              </div>

              <button
                type="button"
                className="students-modal-close"
                onClick={closeForm}
                disabled={saving}
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="students-form">

              <div className="students-form-section-title">
                <UserRound size={18} />
                Personal Information
              </div>

              <div className="students-form-grid">

                <div className="students-form-group">
                  <label>Student ID *</label>
                  <input
                    name="student_id"
                    value={form.student_id}
                    onChange={handleChange}
                    placeholder="Example: STU001"
                    required
                  />
                </div>

                <div className="students-form-group">
                  <label>First Name *</label>
                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div className="students-form-group">
                  <label>Last Name *</label>
                  <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div className="students-form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    required
                  />
                </div>

                <div className="students-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="students-form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="students-form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={form.date_of_birth}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="students-form-section-title students-academic-title">
                <BookOpen size={18} />
                Academic Information
              </div>

              <div className="students-form-grid">

                <div className="students-form-group">
                  <label>Course *</label>
                  <input
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    placeholder="Example: BCA"
                    required
                  />
                </div>

                <div className="students-form-group students-full-width">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    rows="3"
                  />
                </div>

              </div>

              {error && (
                <div className="students-alert students-alert-error">
                  {error}
                </div>
              )}

              <div className="students-form-actions">
                <button
                  type="button"
                  className="students-cancel-btn"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="students-submit-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId !== null
                      ? "Update Student"
                      : "Save Student"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* STUDENT DETAILS MODAL */}
      {showDetails && selectedStudent && (
        <div
          className="students-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDetails();
          }}
        >
          <div className="students-modal students-details-modal">

            <div className="students-modal-header">
              <div>
                <span>STUDENT PROFILE</span>
                <h2>Student Details</h2>
                <p>Complete information about this student.</p>
              </div>

              <button
                type="button"
                className="students-modal-close"
                onClick={closeDetails}
                aria-label="Close details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="students-details-profile">
              <div className="students-details-avatar">
                {selectedStudent.first_name?.charAt(0)?.toUpperCase() || "S"}
              </div>

              <div>
                <h3>
                  {selectedStudent.first_name} {selectedStudent.last_name}
                </h3>
                <span>
                  {selectedStudent.student_id || `Student #${selectedStudent.id}`}
                </span>
              </div>
            </div>

            <div className="students-details-grid">
              <div>
                <Mail size={17} />
                <span>Email Address</span>
                <strong>{selectedStudent.email || "—"}</strong>
              </div>

              <div>
                <Phone size={17} />
                <span>Phone Number</span>
                <strong>{selectedStudent.phone || "—"}</strong>
              </div>

              <div>
                <UserRound size={17} />
                <span>Gender</span>
                <strong>{selectedStudent.gender || "—"}</strong>
              </div>

              <div>
                <BookOpen size={17} />
                <span>Course</span>
                <strong>{selectedStudent.course || "—"}</strong>
              </div>

              <div>
                <CalendarDays size={17} />
                <span>Date of Birth</span>
                <strong>{selectedStudent.date_of_birth || "—"}</strong>
              </div>

              <div>
                <MapPin size={17} />
                <span>Address</span>
                <strong>{selectedStudent.address || "—"}</strong>
              </div>
            </div>

            <div className="students-details-actions">
              <button
                type="button"
                className="students-cancel-btn"
                onClick={closeDetails}
              >
                Close
              </button>

              <button
                type="button"
                className="students-submit-btn"
                onClick={() => {
                  const student = selectedStudent;
                  closeDetails();
                  openEditForm(student);
                }}
              >
                <Pencil size={16} />
                Edit Student
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Students;