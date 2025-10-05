import React from 'react'
import { Link } from "react-router-dom";
import styles from"../css/NotFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.notfoundContainer}>
            <div className={styles.iconContainer}>
                <span className={`material-symbols-outlined ${styles.icon}`}>
                    error
                </span>
            </div>
            <h1 className={styles.notfoundTitle}>404 - Page Not Found</h1>
            <p className={styles.notfoundMessage}>
                Oops! The page you are looking for doesn’t exist.
            </p>
            <Link to="/login" className={styles.btnPrimary}>
                Go back to Login
            </Link>
        </div>
    )
}

export default NotFound
