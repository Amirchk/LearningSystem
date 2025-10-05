import React from 'react';
import styles from "../css/GettingStarted.module.css";
import { useDarkMode } from "./DarkModeContext";
import { Link } from "react-router-dom";
import emoji from "../imgs/emoji.jpg";

const GettingStarted = () => {
    const { darkMode, setDarkMode } = useDarkMode();
    return (
        <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoIcon}>
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
                    </div>
                    <h1 className={styles.logoText}>
                        Collaborative Learning Partner System
                    </h1>
                </div>

                <div className={styles.navContainer}>
                    <div className={styles.navLinks}>
                        <Link to="/website" className={styles.navLink} href="#">
                            Home
                        </Link>
                    </div>
                    <div
                        className={styles.profileAvatarSm}
                        style={{
                            backgroundImage:
                                `url(${emoji})`,
                        }}
                    />
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.helpHeader}>
                    <h2 className={styles.helpTitle}>
                        Getting Started with Collaborative Learning
                    </h2>
                    <p className={styles.helpSubtitle}>
                        Let's get you started. Follow these simple steps to set up your
                        profile, find study partners, and begin collaborating for academic
                        success.
                    </p>
                </div>

                <div className={styles.helpGrid}>
                    {/* Step 1 */}
                    <div className={styles.helpCard}>
                        <div className={styles.cardIcon}>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>Step 1: Create Your Profile</h3>
                        <p className={styles.cardDescription}>
                            Personalize your account with your academic details, subjects, and
                            study preferences. A complete profile helps us find your perfect
                            match.
                        </p>
                        <a className={styles.cardLink} href="#">
                            <span>Set Up Profile</span>
                            <svg
                                fill="currentColor"
                                height="16"
                                viewBox="0 0 16 16"
                                width="16"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l4 
                  4a1 1 0 010 1.414l-4 4a1 1 
                  0 01-1.414-1.414L12.586 8 
                  10.293 5.707a1 1 0 
                  010-1.414zM5.293 3.293a1 
                  1 0 011.414 0l4 4a1 1 0 01 
                  0 1.414l-4 4a1 1 0 
                  01-1.414-1.414L7.586 8 
                  5.293 5.707a1 1 0 010-1.414z"
                                />
                            </svg>
                        </a>
                    </div>

                    {/* Step 2 */}
                    <div className={styles.helpCard}>
                        <div className={styles.cardIcon}>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 
                0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>Step 2: Find a Study Partner</h3>
                        <p className={styles.cardDescription}>
                            Use our smart matching system to discover students with
                            complementary skills and schedules. Browse profiles and send
                            connection requests.
                        </p>
                        <a className={styles.cardLink} href="#">
                            <span>Discover Partners</span>
                            <svg
                                fill="currentColor"
                                height="16"
                                viewBox="0 0 16 16"
                                width="16"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l4 
                  4a1 1 0 010 1.414l-4 4a1 1 
                  0 01-1.414-1.414L12.586 8 
                  10.293 5.707a1 1 0 
                  010-1.414zM5.293 3.293a1 
                  1 0 011.414 0l4 4a1 1 0 01 
                  0 1.414l-4 4a1 1 0 
                  01-1.414-1.414L7.586 8 
                  5.293 5.707a1 1 0 010-1.414z"
                                />
                            </svg>
                        </a>
                    </div>

                    {/* Step 3 */}
                    <div className={styles.helpCard}>
                        <div className={styles.cardIcon}>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M17 20h5v-2a3 3 0 
                00-5.356-1.857M17 20H7m10 
                0v-2c0-.656-.126-1.283-.356-1.857M7 
                20H2v-2a3 3 0 
                015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 
                0a5.002 5.002 0 
                019.288 0M15 7a3 3 0 
                11-6 0 3 3 0 016 0zm6 
                3a2 2 0 11-4 0 2 2 0 
                014 0zM7 10a2 2 0 11-4 0 
                2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>Step 3: Start Collaborating</h3>
                        <p className={styles.cardDescription}>
                            Once connected, you can create study groups, schedule sessions,
                            and share resources. Achieve your academic goals together!
                        </p>
                        <a className={styles.cardLink} href="#">
                            <span>Create a Group</span>
                            <svg
                                fill="currentColor"
                                height="16"
                                viewBox="0 0 16 16"
                                width="16"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l4 
                  4a1 1 0 010 1.414l-4 4a1 1 
                  0 01-1.414-1.414L12.586 8 
                  10.293 5.707a1 1 0 
                  010-1.414zM5.293 3.293a1 
                  1 0 011.414 0l4 4a1 1 0 01 
                  0 1.414l-4 4a1 1 0 
                  01-1.414-1.414L7.586 8 
                  5.293 5.707a1 1 0 010-1.414z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className={styles.ctaSection}>
                    <a className={styles.cta} href="#">
                        Find Your Study Buddy Now
                    </a>
                </div>
            </main>
        </div>
    )
}

export default GettingStarted
