import React, { useState } from "react";
import styles from "../css/Signup.module.css";
import { useDarkMode } from "./DarkModeContext";
import { Link } from "react-router-dom";
import Quiz from "../components/Quiz";

const computeXpFromScore = (score, total) => {
  // simple XP formula: base 100 + percent * 100
  const percent = total > 0 ? (score / total) : 0;
  return Math.round(100 + percent * 100);
};

const Signup = () => {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    password: "",
    department: "",
    semester: "",
    age: "",
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
  const [quizResult, setQuizResult] = useState(null); // {score,total,xp,source}

  const subjects = [
    "DSA",
    "Web Development",
    "MAD",
    "Programming Fundamentals",
    "Artificial Intelligence",
    "C#",
    "Database Management",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Information Security",
    "Cyber Security",
    "Linear Algebra",
    "Calculus",
    "Statistics"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) setPicture(file);
  };

  // handle checkbox arrays (strengths / difficulties)
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(f => {
      const arr = Array.isArray(f[field]) ? [...f[field]] : [];
      if (checked && !arr.includes(value)) arr.push(value);
      if (!checked) {
        const idx = arr.indexOf(value);
        if (idx !== -1) arr.splice(idx, 1);
      }
      return { ...f, [field]: arr };
    });
  };

  // handle radio inputs (studyStyle etc.)
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
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
      setQuizQuestions(data.questions || []);
      setShowQuiz(true);
    } catch (err) {
      console.error(err);
      setQuizError("Unable to generate quiz right now.");
    } finally {
      setQuizLoading(false);
    }
  };

  // called by Quiz when finished
  const handleQuizFinish = (score, total) => {
    const xp = computeXpFromScore(score, total);
    setQuizResult({ score, total, xp });
    setShowQuiz(false);
    // optionally show a toast, or auto-fill formData.xp
    setFormData(f => ({ ...f, xp }));
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
          formData[key].forEach(val => payload.append(key, val));
        } else {
          payload.append(key, formData[key] ?? "");
        }
      }
      if (picture) payload.append("picture", picture);
      // include xp if quiz was taken
      if (quizResult && typeof quizResult.xp === "number") {
        payload.append("xp", String(quizResult.xp));
        payload.append("quizScore", String(quizResult.score));
        payload.append("quizTotal", String(quizResult.total));
      }

      // server endpoint: POST /signup
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: payload,
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSuccess(data.message || "Profile created.");
        // reset form
        setFormData({
          name: "",
          rollNumber: "",
          email: "",
          password: "",
          department: "",
          semester: "",
          age: "",
          strengths: [],
          difficulties: [],
          studyStyle: "",
          availability: "",
        });
        setPicture(null);
        setQuizResult(null);
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

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ""}`}>
      <main className={styles.main}>
        <div className={styles.card}>
          <h2>Create Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* name, email etc. */}
            <div className={styles.formGroup}>
              <label>Name</label>
              <input name="name" value={formData.name} onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label>Age</label>
              <input name="age" type="number" value={formData.age} onChange={handleInputChange} min="10" max="120" />
            </div>

            <div className={styles.formGroup}>
              <label>Roll Number</label>
              <input
                name="rollNumber"
                type="text"
                value={formData.rollNumber}
                onChange={handleInputChange}
                placeholder="e.g., 21CS001"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Profile Picture</label>
              <input
                name="picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g., johndoe@gmail.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Department</label>
              <input
                name="department"
                type="text"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Semester</label>
              <input
                name="semester"
                type="text"
                value={formData.semester}
                onChange={handleInputChange}
                placeholder="e.g., 5th"
              />
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
              <button type="button" onClick={fetchQuizFromServer} disabled={quizLoading} className={styles.submitButton}>
                {quizLoading ? "Generating Quiz..." : "Take Skill Quiz"}
              </button>
              {quizError && <div className={styles.errorMessage}>{quizError}</div>}
            </div>

            {/* show Create Profile only after quiz completed */}
            {!quizResult ? (
              <div style={{ marginTop: 12 }}>
                <button
                  type="button"
                  disabled
                  className={styles.submitButton}
                  title="Complete the skill quiz to enable Create Profile"
                >
                  Complete the Skill Quiz to Create Profile
                </button>
              </div>
            ) : (
              <div className={styles.submitButtonContainer}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? "Creating Profile..." : "Create Profile"}
                </button>
              </div>
            )}
          </form>

          {showQuiz && (
            <div style={{ marginTop: 18, padding: 14, border: "1px solid #ddd", borderRadius: 6 }}>
              <Quiz questions={quizQuestions} onClose={() => setShowQuiz(false)} onFinish={handleQuizFinish} />
            </div>
          )}

          {quizResult && (
            <div style={{ marginTop: 12 }}>
              <strong>Quiz completed:</strong> {quizResult.score} / {quizResult.total} — XP: {quizResult.xp}
            </div>
          )}

          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}
        </div>
      </main>
    </div>
  );
};

export default Signup;
