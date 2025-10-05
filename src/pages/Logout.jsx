import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Logout.module.css";


const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Clear everything from localStorage & sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Optional: if you only want to remove specific keys, do:
      // localStorage.removeItem("user");
      // localStorage.removeItem("authToken");

      if (typeof onLogout === "function") {
        onLogout();
      }
    } catch (err) {
      console.error("Error clearing storage:", err);
    }

    // Redirect to login
    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    navigate(-1); // Go back
  };

  return (
    <div className={styles.logoutContainer}>
      <div className={styles.logoutIcon} aria-hidden="true">
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className={styles.logoutTitle}>Are you sure?</h1>

      <p className={styles.logoutMessage}>
        You are about to log out of the Collaborative Learning Partner System.
      </p>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnLogout}`}
          onClick={handleLogout}
        >
          Logout
        </button>

        <button
          type="button"
          className={`${styles.btn} ${styles.btnCancel}`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
