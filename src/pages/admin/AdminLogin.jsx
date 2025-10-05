import React from 'react';
import styles from '../../css/admincss/AdminLogin.module.css';

const AdminLogin = () => {
    return (
        <div className={styles.mainContainer}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.headerContent}>
                        <div className={styles.logoContainer}>
                            <div className={styles.logoIcon}>
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
                                </svg>
                            </div>
                            <h1 className={styles.logoText}>
                                Collaborative Learning Partner System
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.loginFormContainer}>
                    <div>
                        <h2 className={styles.formTitle}>Admin Login</h2>
                        <p className={styles.formSubtitle}>
                            Secure access for administrators
                        </p>
                    </div>

                    <form className={styles.loginForm}>
                        <div className={styles.inputGroup}>
                            <div>
                                <label className={styles.srOnly} htmlFor="username">
                                    Username/Email
                                </label>
                                <input
                                    className={styles.inputField}
                                    id="username"
                                    name="username"
                                    placeholder="Username or Email"
                                    required
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className={styles.srOnly} htmlFor="password">
                                    Password
                                </label>
                                <input
                                    autoComplete="current-password"
                                    className={styles.inputField}
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    type="password"
                                />
                            </div>
                        </div>

                        <div className={styles.formOptions}>
                            <div className={styles.textSm}>
                                <a className={styles.forgotPasswordLink} href="#">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button className={styles.loginButton} type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default AdminLogin
