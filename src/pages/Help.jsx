import React from 'react'
import styles from "../css/Help.module.css";
import { useDarkMode } from "./DarkModeContext";
import { Link } from 'react-router-dom';
import emoji from "../imgs/emoji.jpg";

const Help = () => {
    const { darkMode, setDarkMode } = useDarkMode();
    return (
        <div className={`${styles.containerWrapper} ${darkMode ? styles.darkMode : ''}`}>
            {/* Header */}
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
                    <h1 className={styles.logoText}>Collaborative Learning Partner System</h1>
                </div>

                <div className={styles.navContainer}>
                    <div className={styles.navLinks}>
                        <Link to="/Website" className={styles.navLink} href="#">Home</Link>
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

            {/* Main */}
            <main className={styles.main}>
                <div className={styles.helpHeader}>
                    <h2 className={styles.helpTitle}>How can we help you?</h2>
                    <p className={styles.helpSubtitle}>
                        Find answers to your questions, contact our support team, and get the most out of our platform.
                    </p>
                </div>

                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        <input className={styles.searchInput} placeholder="Search for help..." type="text" />
                        <div className={styles.searchIcon}>
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
                    </div>
                </div>

                <div className={styles.helpGrid}>
                    <div className={styles.helpCard}>
                        <div className={styles.cardIcon}>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>Getting Started</h3>
                        <p className={styles.cardDescription}>Learn the basics of setting up your profile and finding your first study partner.</p>
                        <Link to="/GettingStarted">
                            <a className={styles.cardLink} href="#"><span>Read Guide</span>
                                <svg fill="currentColor" height="16" viewBox="0 0 16 16" width="16"><path clipRule="evenodd" fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 8 10.293 5.707a1 1 0 010-1.414zM5.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L7.586 8 5.293 5.707a1 1 0 010-1.414z" /></svg>
                            </a>
                        </Link>
                    </div>

                    <div className={styles.helpCard}>
                        <div className={styles.cardIcon}>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <h3 className={styles.cardTitle}>Study Groups</h3>
                        <p className={styles.cardDescription}>Find out how to create, join, and manage study groups for effective collaboration.</p>
                        <a className={styles.cardLink} href="#"><span>Learn More</span>
                            <svg fill="currentColor" height="16" viewBox="0 0 16 16" width="16"><path clipRule="evenodd" fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 8 10.293 5.707a1 1 0 010-1.414zM5.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L7.586 8 5.293 5.707a1 1 0 010-1.414z" /></svg>
                        </a>
                    </div>

                    <div className={styles.helpCard}>
                        <div className={styles.cardIcon}>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className={styles.cardTitle}>Contact Support</h3>
                        <p className={styles.cardDescription}>Can't find what you're looking for? Reach out to our support team directly.</p>
                        <a className={styles.cardLink} href="#"><span>Get in Touch</span>
                            <svg fill="currentColor" height="16" viewBox="0 0 16 16" width="16"><path clipRule="evenodd" fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 8 10.293 5.707a1 1 0 010-1.414zM5.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L7.586 8 5.293 5.707a1 1 0 010-1.414z" /></svg>
                        </a>
                    </div>
                </div>

                <div className={styles.faqSection}>
                    <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
                    <div className={styles.faqContainer}>

                        <div className={styles.faqItem}>
                            <input className={styles.faqToggle} id="faq1" type="checkbox" />
                            <label className={styles.faqQuestion} htmlFor="faq1">
                                How do I update my academic profile?
                                <span className={styles.faqIcon}>
                                    <svg fill="none" height="24" stroke="currentColor" viewBox="0 0 24 24" width="24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                </span>
                            </label>
                            <div className={styles.faqAnswer}>
                                <p>
                                    You can update your academic profile by navigating to your "Profile" page and clicking the "Edit Profile" button. There you can change your major, list your strengths and weaknesses, and set your study preferences to find the best matches.
                                </p>
                            </div>
                        </div>

                        <div className={styles.faqItem}>
                            <input className={styles.faqToggle} id="faq2" type="checkbox" />
                            <label className={styles.faqQuestion} htmlFor="faq2">
                                What is the matching algorithm based on?
                                <span className={styles.faqIcon}>
                                    <svg fill="none" height="24" stroke="currentColor" viewBox="0 0 24 24" width="24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                </span>
                            </label>
                            <div className={styles.faqAnswer}>
                                <p>
                                    Our matching algorithm considers multiple factors, including your academic subjects, listed strengths and difficulties, study preferences (e.g., online vs. in-person), and availability. The goal is to connect you with partners who complement your learning style and schedule.
                                </p>
                            </div>
                        </div>

                        <div className={styles.faqItem}>
                            <input className={styles.faqToggle} id="faq3" type="checkbox" />
                            <label className={styles.faqQuestion} htmlFor="faq3">
                                Is there a mobile app available?
                                <span className={styles.faqIcon}>
                                    <svg fill="none" height="24" stroke="currentColor" viewBox="0 0 24 24" width="24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                </span>
                            </label>
                            <div className={styles.faqAnswer}>
                                <p>
                                    Currently, we are a web-based platform. However, our website is fully responsive and works great on mobile browsers. We are actively working on developing dedicated mobile apps for both iOS and Android, so stay tuned for updates!
                                </p>
                            </div>
                        </div>

                        <div className={styles.faqItem}>
                            <input className={styles.faqToggle} id="faq4" type="checkbox" />
                            <label className={styles.faqQuestion} htmlFor="faq4">
                                How do I report a user or an issue?
                                <span className={styles.faqIcon}>
                                    <svg fill="none" height="24" stroke="currentColor" viewBox="0 0 24 24" width="24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                </span>
                            </label>
                            <div className={styles.faqAnswer}>
                                <p>
                                    If you encounter any issues or need to report another user, you can use the "Contact Support" link on this page. Please provide as much detail as possible so our team can investigate and take appropriate action promptly to maintain a safe and productive learning environment.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>

    )
}

export default Help
