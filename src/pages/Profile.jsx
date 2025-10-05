import { react, useEffect } from "react";
import styles from "../css/Profile.module.css";
import { useDarkMode } from "./DarkModeContext";
import { Link } from "react-router-dom";
import emoji from "../imgs/emoji.jpg";
import { useState } from "react";

const Profile = () => {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetch(`http://localhost:5000/student/${storedUser._id}/stats`)
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.error("Error fetching stats:", err));
    }
  }, []);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  const totalModules = 20;   // max modules
  const studyGoal = 100;     // target study hours
  const maxGroups = 5;       // expected max active groups

  const moduleProgress = stats?.completedModules
    ? (stats.completedModules / totalModules) * 100
    : 0;

  const hoursProgress = stats?.studyHours
    ? (stats.studyHours / studyGoal) * 100
    : 0;

  const groupsProgress = stats?.activeGroups
    ? (stats.activeGroups / maxGroups) * 100
    : 0;

  // Weighted final progress
  const progress = Math.min(
    (moduleProgress * 0.5) + (hoursProgress * 0.3) + (groupsProgress * 0.2),
    100
  );

  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.flexGrow}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className={styles.logoText}>
              Collaborative Learning Partner System
            </h2>
          </div>

          <div className={styles.navContainer}>
            <div className={styles.navLinks}>
              <Link to="/Website" className={styles.navLink} href="#">Home</Link>
            </div>


            <Link to="/Notifications" className={styles.settingsButton}>
              <button className={styles.iconButton}>
                <svg
                  fill="currentColor"
                  height="20px"
                  viewBox="0 0 256 256"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                </svg>
              </button>
            </Link>

            <div
              className={styles.profileAvatarSm}
              style={{
                backgroundImage: user?.pictureUrl
                  ? `url(http://localhost:5000${user.pictureUrl})`
                  : `url(${emoji})`,  // fallback if no uploaded image
              }}
            >
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.profileContainer}>
            {/* Profile Header */}
            <div className={styles.profileHeader}>
              <div className={styles.profileInfo}>
                <div
                  className={styles.profileAvatarLg}
                  style={{
                    backgroundImage: user?.pictureUrl
                      ? `url(http://localhost:5000${user.pictureUrl})`
                      : `url(${emoji})`,  // fallback if no uploaded image
                  }}
                ></div>
                <div className={styles.profileDetails}>
                  <p className={styles.profileName}>
                    {user?.name || "Guest"}
                  </p>

                  <p className={styles.profileLevel}>Level 3</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className={styles.profileTabs}>
              <div className={styles.tabsNav}>
                <a className={`${styles.tabLink} ${styles.active}`} href="#">
                  <p className={styles.tabText}>About</p>
                </a>
                <a className={styles.tabLink} href="#">
                  <p className={styles.tabText}>Progress</p>
                </a>
                <a className={styles.tabLink} href="#">
                  <p className={styles.tabText}>Avatar</p>
                </a>
              </div>
            </div>

            {/* Academic Profile */}
            <div className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>Academic Profile</h2>
              <div className={styles.academicProfileGrid}>
                <div className={styles.profileItem}>
                  <p className={styles.itemLabel}>Strengths</p>
                  <p className={styles.itemValue}>
                    {user?.strengths?.length ? user.strengths.join(", ") : "Not provided"}
                  </p>
                </div>

                <div className={styles.profileItem}>
                  <p className={styles.itemLabel}>Difficulties</p>
                  <p className={styles.itemValue}>
                    {user?.difficulties?.length ? user.difficulties.join(", ") : "Not provided"}
                  </p>
                </div>

                <div className={styles.profileItem}>
                  <p className={styles.itemLabel}>Preferences</p>
                  <p className={styles.itemValue}>
                    {user?.studyStyle || "Not provided"} | {user?.availability || ""}
                  </p>
                </div>
              </div>

            </div>

            {/* Learning Progress */}
            <div className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>Learning Progress</h2>
              <div className={styles.progressContainer}>
                <div className={styles.overallProgress}>
                  <div className={styles.progressHeader}>
                    <p className={styles.progressLabel}>Overall Progress</p>
                    <p className={styles.progressPercentage}>
                      {Math.round(progress)}%
                    </p>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div
                      className={styles.progressBarFill}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>


                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <p className={styles.statLabel}>Completed Modules</p>
                    <p className={styles.statValue}>{stats?.completedModules ?? "0"}</p>
                  </div>
                  <div className={styles.statCard}>
                    <p className={styles.statLabel}>Active Study Groups</p>
                    <p className={styles.statValue}>{stats?.activeGroups ?? "0"}</p>
                  </div>
                  <div className={styles.statCard}>
                    <p className={styles.statLabel}>Hours Studied</p>
                    <p className={styles.statValue}>{stats?.studyHours ?? "0"}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
