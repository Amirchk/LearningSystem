import React, { useState } from "react";
import styles from "../css/Signup.module.css";
import { useDarkMode } from "./DarkModeContext";
import { Link } from "react-router-dom";
import Quiz from "../components/Quiz";

const Signup = () => {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    password: "",
    department: "",
    semester: "",
    strengths: [],
    difficulties: [],
    studyStyle: "",
    availability: "",
  });
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizError, setQuizError] = useState("");

  const subjects = [
    "DSA", "Web Development", "MAD", "Programming Fundamentals", "Artificial Intelligence",
    "C#", "Database Management", "Operating Systems", "Computer Networks",
    "Software Engineering", "Information Security", "Cyber Security",
    "Linear Algebra", "Calculus", "Statistics"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((f) => {
      const arr = Array.isArray(f[field]) ? [...f[field]] : [];
      if (checked && !arr.includes(value)) arr.push(value);
      if (!checked) {
        const idx = arr.indexOf(value);
        if (idx !== -1) arr.splice(idx, 1);
      }
      return { ...f, [field]: arr };
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) setPicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((val) => payload.append(key, val));
        } else {
          payload.append(key, formData[key] ?? "");
        }
      }
      if (picture) payload.append("picture", picture);

      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: payload,
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSuccess(data.message || "Profile created.");
        setFormData({
          name: "",
          rollNumber: "",
          email: "",
          password: "",
          department: "",
          semester: "",
          strengths: [],
          difficulties: [],
          studyStyle: "",
          availability: "",
        });
        setPicture(null);
      } else {
        setError(data.message || "Failed to create profile.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchQuizFromServer = async () => {
    setQuizError("");
    setQuizLoading(true);
    setQuizQuestions([]);
    try {
      const topics = formData.strengths && formData.strengths.length
        ? formData.strengths.slice(0, 5)
        : ["Programming Fundamentals", "DSA"];

      const res = await fetch("http://localhost:5000/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to generate quiz");
      // Expect data.questions = [{ question, options: [...4], answer }, ...]
      console.log("Generated quiz:", data);
      setQuizQuestions(data.questions || []);
      setShowQuiz(true);
    } catch (err) {
      console.error(err);
      setQuizError("Unable to generate quiz right now.");
    } finally {
      setQuizLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ""}`}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <svg
              className={styles.logoIcon}
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fill="currentColor"
                fillRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
              />
            </svg>
            <h1 className={styles.logoText}>Collaborative Learning Partner System</h1>
          </div>
          <Link to="/login" className={styles.loginButton}>
            Login
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formHeaderTitle}>Student Registration &amp; Profile</h2>
            <p className={styles.formHeaderText}>
              Complete your profile to connect with the best study partners for you.
            </p>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rollNumber" className={styles.label}>Roll Number</label>
                <input
                  id="rollNumber"
                  name="rollNumber"
                  type="text"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., 21CS001"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="picture" className={styles.label}>Profile Picture</label>
                <input
                  id="picture"
                  name="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g., johndoe@gmail.com"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="********"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="department" className={styles.label}>Department</label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="semester" className={styles.label}>Semester</label>
                <input
                  id="semester"
                  name="semester"
                  type="text"
                  value={formData.semester}
                  onChange={handleInputChange}
                  placeholder="e.g., 5th"
                  className={styles.input}
                />
              </div>
            </div>

            {/* Academic Profile */}
            <div className={styles.sectionDivider}><h3>Academic Profile</h3></div>

            <div className={styles.formGroup}>
              <label>Academic Strengths</label>
              <p className={styles.sectionDescription}>Select the subjects you excel in.</p>
              <div className={styles.checkboxGrid}>
                {subjects.map((subject) => (
                  <div className={styles.checkboxItem} key={`s-${subject}`}>
                    <input
                      type="checkbox"
                      id={`s-${subject}`}
                      value={subject}
                      checked={formData.strengths.includes(subject)}
                      onChange={(e) => handleCheckboxChange(e, "strengths")}
                    />
                    <label htmlFor={`s-${subject}`}>{subject}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Subjects of Difficulty</label>
              <p className={styles.sectionDescription}>Select subjects where you need help.</p>
              <div className={styles.checkboxGrid}>
                {subjects.map((subject) => (
                  <div className={styles.checkboxItem} key={`d-${subject}`}>
                    <input
                      type="checkbox"
                      id={`d-${subject}`}
                      value={subject}
                      checked={formData.difficulties.includes(subject)}
                      onChange={(e) => handleCheckboxChange(e, "difficulties")}
                    />
                    <label htmlFor={`d-${subject}`}>{subject}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Preferences */}
            <div className={styles.sectionDivider}><h3>Learning Preferences</h3></div>

            <div className={styles.formGroup}>
              <label>Preferred Study Style</label>
              <div className={styles.radioGroup}>
                {[
                  { id: "individual", label: "Individual Study" },
                  { id: "group", label: "Group Collaboration" },
                  { id: "one-on-one", label: "One-on-One Mentoring" },
                ].map(({ id, label }) => (
                  <div className={styles.radioItem} key={id}>
                    <input
                      type="radio"
                      id={id}
                      name="studyStyle"
                      value={id}
                      checked={formData.studyStyle === id}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor={id}>{label}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className={styles.formGroup}>
              <label htmlFor="availability">Availability</label>
              <p className={styles.sectionDescription}>
                Let others know when you're free to study.
              </p>
              <textarea
                id="availability"
                name="availability"
                rows={3}
                value={formData.availability}
                onChange={handleInputChange}
                placeholder="e.g., Weekday evenings after 6 PM, Weekends all day..."
                className={styles.textarea}
              />
            </div>

            <div style={{ marginTop: 12 }}>
              <button
                type="button"
                onClick={fetchQuizFromServer}
                disabled={quizLoading}
                className={styles.submitButton}
              >
                {quizLoading ? "Generating Quiz..." : "Generate 10-question Quiz"}
              </button>
              {quizError && <div className={styles.errorMessage} style={{ marginTop: 8 }}>{quizError}</div>}
            </div>

            <div className={styles.submitButtonContainer}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? "Creating Profile..." : "Create Profile"}
              </button>
            </div>
          </form>
          {showQuiz && (
            <div style={{ marginTop: 18, padding: 14, border: "1px solid #ddd", borderRadius: 6 }}>
              <Quiz questions={quizQuestions} onClose={() => setShowQuiz(false)} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Signup;
