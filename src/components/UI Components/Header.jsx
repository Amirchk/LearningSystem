import React from 'react';
import styles from "../Components CSS/Header.module.css"
import { Link } from 'react-router-dom';
import faizanHeaderImg from "../../imgs/faizanimage.jpg"

const Header = () => {
    return (
        <div>
            <header className={styles.mainHeader}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoIcon}>
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path
                                clipRule="evenodd"
                                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </div>
                    <Link to="/website">
                    <h2 className={styles.logoText}>Collaborative Learning Partner System</h2>
                    </Link>
                </div>
                <nav className={styles.headerNav}>
                </nav>
                <div className={styles.headerActions}>
                    <img
                        alt="User avatar"
                        className={styles.userAvatar}
                        src={faizanHeaderImg}
                    />
                </div>
            </header>
        </div>
    )
}

export default Header
