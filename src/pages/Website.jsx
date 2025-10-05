import React, { useState, useEffect } from "react";
import styles from "../css/Dashboard.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import faizanHeaderImg from "../imgs/faizanimage.jpg";
import emoji from "../imgs/emoji.jpg";
import { Link } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext";


const Dashboard = () => {
  const [user, setUser] = useState(null);     // ✅ Declare this first
  const [matches, setMatches] = useState([]);
  const [activeGroups, setActiveGroups] = useState([]);
  const { darkMode, setDarkMode } = useDarkMode();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    
  }, []);

  // Fetch matches when user is ready
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (user?._id) {
          const res = await fetch(`http://localhost:5000/api/matches/${user._id}`);
          const data = await res.json();
          setMatches(data.matches || []);
        }
      } catch (err) {
        console.error("Error fetching matches", err);
      }
    };

    fetchMatches();
  }, [user]);

  // Fetch active study groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/dashboard");
        const data = await res.json();
        setActiveGroups(data.activeGroups || []);
      } catch (err) {
        console.error("Error fetching groups:", err);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className={`${styles.containerWrapper} ${darkMode ? styles.darkMode : ''}`}>
      <aside className={styles.sidebar}>
        <div className={styles.profileSection}>
          <img
            alt={user?.name || "User"}
            className={styles.profileImage}
            src={
              user?.pictureUrl
                ? `http://localhost:5000${user.pictureUrl}`
                : faizanHeaderImg // fallback if no upload
            }
          />
          <h2 className={styles.profileName}>{user?.name}</h2>

          <p className={styles.profileLevel}>Level 3 - 1200 XP</p>
          <div className={styles.xpProgress}>
            <div className={styles.xpInfo}>
              <span>Next Level</span>
              <span>300 XP to go</span>
            </div>
            <div className={styles.progressBarBg}>
              <div className={styles.progressBar}></div>
            </div>
          </div>
        </div>
        <nav className={styles.mainNav}>
          <h3 className={styles.navHeading}>Quick Actions</h3>
          <Link to="/Profile" className={styles.navLink} href="#">
            <span className="material-symbols-outlined">person</span> View Profile
          </Link>
          <Link to="/Settings" className={styles.navLink} href="#">
            <span className="material-symbols-outlined">settings</span> Settings
          </Link>
          <Link to="/Help" className={styles.navLink} href="#">
            <span className="material-symbols-outlined">help</span> Help &amp; Support
          </Link>
          <Link to="/Logout" className={styles.navLink} href="#">
            <span className="material-symbols-outlined">logout</span> Logout
          </Link>
        </nav>
      </aside>

      <div className={styles.mainContent}>
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
            <h2 className={styles.logoText}>Collaborative Learning Partner System</h2>
          </div>
          <nav className={styles.headerNav}>
            <a href="#">Home</a>
            <Link to="/creategroup">Groups</Link>
            <a href="#">Matches</a>
            <Link to="/Chat" className="header-nav-link" >Chat</Link>
          </nav>
          <div className={styles.headerActions}>
            <button className={styles.notificationBtn}>
              <Link to="/notifications" className="material-symbols-outlined">Notifications</Link>
            </button>
            <img
              alt={user?.name || "User"}
              className={styles.smallImage}
              src={
                user?.pictureUrl
                  ? `http://localhost:5000${user.pictureUrl}`
                  : faizanHeaderImg // fallback if no upload
              }
            />
          </div>
        </header>

        <main className={styles.dashboard}>
          <div className={styles.dashboardHeader}>
            <h1>Integrated Student Dashboard</h1>
            <p>Welcome back, {user?.name || "User"} Here's your study overview.</p>
          </div>

          {/* Active Study Groups */}
          <section>
            <h3 className={styles.sectionHeading}>Active Study Groups</h3>
            <div className={`${styles.grid} ...`}>
              {activeGroups.map(group => (
                <div className={styles.card} key={group._id}>
                  <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>{group.name}</h4>
                    <p className={styles.cardSubtitle}>Members: {group.members.length}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Peer Matches and Quick Chat */}
          <div className={`${styles.grid} ${styles.gridCols1} ${styles.lgGridCols3}`}>
            <section className={styles.lgColSpan2}>
              <h3 className={styles.sectionHeading}>Intelligent Peer Matches</h3>
              <div>
                <div>
                  {matches.length === 0 ? (
                    <p>No users according to your subjects are found.</p>
                  ) : (
                    matches.map((match) => (
                      <div key={match._id} className={styles.matchCard}>
                        <img
                          alt={match.name}
                          className={styles.matchAvatar}
                          src={match.pictureUrl ? `http://localhost:5000${match.pictureUrl}` : emoji}
                        />
                        <div className={styles.matchInfo}>
                          <div className={styles.matchHeader}>
                            <div>
                              <p className={styles.matchName}>{match.name}</p>
                              <p className={styles.matchDetails}>
                                Strengths: {match.strengths.join(", ")} <br />
                                Difficulties: {match.difficulties.join(", ")}
                              </p>
                            </div>
                            <span className={`${styles.reliabilityBadge} ${styles.reliabilityHigh}`}>
                              Reliability: 95%
                            </span>
                          </div>
                          <button className={styles.connectBtn}>Connect</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>


                {/* <div>
                  {matches.length === 0 && <p>No matches found yet.</p>}
                  {matches.map((match) => (
                    <div key={match._id} className={styles.matchCard}>
                      <img
                        alt={match.name}
                        className={styles.matchAvatar}
                        src={match.pictureUrl ? `http://localhost:5000${match.pictureUrl}` : emoji}
                      />
                      <div className={styles.matchInfo}>
                        <div className={styles.matchHeader}>
                          <div>
                            <p className={styles.matchName}>{match.name}</p>
                            <p className={styles.matchDetails}>
                              Strengths: {match.strengths.join(", ")} | Difficulties: {match.difficulties.join(", ")}
                            </p>
                          </div>
                          <span className={`${styles.reliabilityBadge} ${styles.reliabilityHigh}`}>
                            Reliability: 95%
                          </span>
                        </div>
                        <button className={styles.connectBtn}>Connect</button>
                      </div>
                    </div>
                  ))}
                </div> */}

              </div>
            </section>

            <section>
              <h3 className={styles.sectionHeading}>Quick Chat</h3>
              <div className={styles.chatContainer}>
                <a className={styles.chatContact} href="#">
                  <img
                    alt="Student 1 chat head"
                    className={styles.chatAvatar}
                    src={emoji}
                  />
                  <div className={styles.chatDetails}>
                    <div className={styles.chatHeader}>
                      <p className={styles.chatName}>Student 1</p>
                      <p className={styles.chatTime}>2 min</p>
                    </div>
                    <p className={styles.chatMessage}>Hey, are you ready for the study session?</p>
                  </div>
                </a>

                <a className={styles.chatContact} href="#">
                  <img
                    alt="Student 2 chat head"
                    className={styles.chatAvatar}
                    src={emoji}
                  />
                  <div className={styles.chatDetails}>
                    <div className={styles.chatHeader}>
                      <p className={styles.chatName}>Student 2</p>
                      <p className={styles.chatTime}>15 min</p>
                    </div>
                    <p className={styles.chatMessage}>I have some questions about the last lecture.</p>
                  </div>
                </a>
              </div>
            </section>
          </div>

          {/* Did You Know */}
          <section>
            <h3 className={styles.sectionHeading}>Did You Know?</h3>
            <div
              className={styles.tipCard}
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIeZ-oBw-rYbXhBUpxNXCWTLnzgf19zI7abRZEztlUGVDjfww1b9JI6pIeilZ5_tPXtSVFlcrfBwXwj8W_5WHBjBZuwvbb59LolRHZXWEkeEQYOyX3L8iymCivf4qI2hBuFszDD8jaA4QjuNOYAqpuuUI4eIuOImSDXkNEobkQ4TLR2YJYvEl3DbkghALSQHiL06x5ZZBFI-BgclCvSmyw-I17Uvs1XoJpaT_K12ajodGOr0YETp6O9eH2XOAWH3IoNWwYv4cNcSS0")'
              }}
            >
              <div className={styles.tipContent}>
                <h4 className={styles.tipTitle}>Study Tip</h4>
                <p className={styles.tipText}>
                  Regular breaks improve focus. Use the Pomodoro technique to maximize learning.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
