import React from "react";
import styles from "../css/Notification.module.css";
import { useDarkMode } from "./DarkModeContext";
import { Link } from "react-router-dom";
import emoji from "../imgs/emoji.jpg";

const Notifications = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <header className={styles.header}>
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
          <h1 className={styles.logoText}>Collaborative Learning Partner System</h1>
        </div>

        <nav className={styles.navContainer}>
          <div className={styles.navLinks}>
            <Link to="/Website" className={styles.navLink}>
              Home
            </Link>
          </div>

          <button className={styles.iconButton} aria-label="open notifications">
            <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"></path>
            </svg>
          </button>

          <button className={styles.iconButton} aria-label="other action">
            <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S12 3.17 12 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
            </svg>
          </button>

          <div
            className={styles.profileAvatarSm}
            style={{
              backgroundImage:
                `url(${emoji})`,
            }}
          />
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.notificationsContainer}>
          <div className={styles.notificationsMain}>
            <div className={styles.pageHeader}>
              <h2 className={styles.pageTitle}>Notifications</h2>
              <a className={styles.markAllRead} href="#">
                Mark all as read
              </a>
            </div>

            <div className={styles.notificationsList}>
              {/* Notification 1 — New Group Member */}
              <div className={styles.notificationCard}>
                <div className={`${styles.notificationIcon} ${styles.iconGroup}`}>
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>

                <div className={styles.notificationContent}>
                  <h3 className={styles.notificationTitle}>New Group Member</h3>
                  <p className={styles.notificationMessage}>
                    <strong>Student 1</strong> has joined your 'Quantum Physics' study group.
                  </p>
                  <p className={styles.notificationTime}>2 hours ago</p>
                </div>

                <div className={styles.unreadIndicator} />
              </div>

              {/* Notification 2 — Study Partner Request */}
              <div className={styles.notificationCard}>
                <div className={`${styles.notificationIcon} ${styles.iconRequest}`}>
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>

                <div className={styles.notificationContent}>
                  <h3 className={styles.notificationTitle}>Study Partner Request</h3>
                  <p className={styles.notificationMessage}>
                    You have a new study partner request from <strong>Student 2</strong> for 'Advanced Algorithms'.
                  </p>
                  <p className={styles.notificationTime}>1 day ago</p>
                </div>

                <div className={styles.unreadIndicator} />
              </div>

              {/* Notification 3 — Session Reminder */}
              <div className={styles.notificationCard}>
                <div className={`${styles.notificationIcon} ${styles.iconReminder}`}>
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z" />
                  </svg>
                </div>

                <div className={styles.notificationContent}>
                  <h3 className={styles.notificationTitle}>Session Reminder</h3>
                  <p className={styles.notificationMessage}>
                    Your 'Data Structures' study session is scheduled for today at 4:00 PM.
                  </p>
                  <p className={styles.notificationTime}>3 days ago</p>
                </div>
              </div>

              {/* Notification 4 — System Update */}
              <div className={styles.notificationCard}>
                <div className={`${styles.notificationIcon} ${styles.iconSystem}`}>
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m19.35 10.04-1.28-.63a8.01 8.01 0 0 0-15.14 0l-1.28.63A4.5 4.5 0 0 0 4.5 19h15a4.5 4.5 0 0 0-.65-8.96z" />
                  </svg>
                </div>

                <div className={styles.notificationContent}>
                  <h3 className={styles.notificationTitle}>System Update</h3>
                  <p className={styles.notificationMessage}>
                    We've updated our matching algorithm to provide even better study partner suggestions.
                  </p>
                  <p className={styles.notificationTime}>5 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Sidebar */}
          <aside className={styles.preferencesSidebar}>
            <h3 className={styles.sidebarTitle}>Preferences</h3>

            <div className={styles.preferenceItem}>
              <span className={styles.preferenceLabel}>Email Notifications</span>
              <label className={styles.switch}>
                <input defaultChecked type="checkbox" />
                <span className={styles.slider} />
              </label>
            </div>

            <div className={styles.preferenceItem}>
              <span className={styles.preferenceLabel}>Push Notifications</span>
              <label className={styles.switch}>
                <input defaultChecked type="checkbox" />
                <span className={styles.slider} />
              </label>
            </div>

            <div className={styles.preferenceItem}>
              <span className={styles.preferenceLabel}>New Partner Requests</span>
              <label className={styles.switch}>
                <input defaultChecked type="checkbox" />
                <span className={styles.slider} />
              </label>
            </div>

            <div className={styles.preferenceItem}>
              <span className={styles.preferenceLabel}>Group Activity</span>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider} />
              </label>
            </div>

            <div className={styles.preferenceItem}>
              <span className={styles.preferenceLabel}>Session Reminders</span>
              <label className={styles.switch}>
                <input defaultChecked type="checkbox" />
                <span className={styles.slider} />
              </label>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
