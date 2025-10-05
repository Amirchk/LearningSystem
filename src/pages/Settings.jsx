import React, { useState, useEffect } from "react";
import styles from "../css/Settings.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext";
import emoji from "../imgs/emoji.jpg";

const Profile = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    // Apply darkMode class to the container wrapper
    <div className={`${styles.containerWrapper} ${darkMode ? styles.darkMode : ''}`}>
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
          <h1 className={styles.logoText}>
            Collaborative Learning Partner System
          </h1>
        </div>

        <div className={styles.navContainer}>
          <div className={styles.navLinks}>
            <Link to="/website" className={styles.navLink}>Home</Link>
            <a className={styles.navLink} href="#">Find Partners</a>
            <a className={styles.navLink} href="#">My Groups</a>
            <a className={styles.navLink} href="#">Messages</a>
          </div>
          <Link to="/Notifications" className={styles.iconButton}>
            <svg
              fill="currentColor"
              height="20px"
              viewBox="0 0 256 256"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
            </svg>
          </Link>
          <div
            className={styles.profileAvatarSm}
            style={{
              backgroundImage: `url(${emoji})`,
            }}
          ></div>
        </div>
      </header >

      {/* Main */}
      <main>
        <div className={styles.settingsContainer}>
          {/* Sidebar */}
          <aside className={styles.settingsSidebar}>
            <nav className={styles.sidebarNav}>
              <h2 className={styles.sidebarTitle}>Settings</h2>
              <div className={styles.sidebarMenu}>
                <a className={`${styles.sidebarLink} ${styles.active}`} href="#">
                  <svg className={styles.sidebarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span>Personal Info</span>
                </a>
                <a className={styles.sidebarLink} href="#">
                  <svg
                    className={styles.sidebarIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <span>Appearance</span>
                </a>
                <a className={styles.sidebarLink} href="#">
                  <svg className={styles.sidebarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span>Privacy</span>
                </a>
                <a className={styles.sidebarLink} href="#">
                  <svg className={styles.sidebarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span>Notifications</span>
                </a>
                <a className={styles.sidebarLink} href="#">
                  <svg className={styles.sidebarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span>Linked Accounts</span>
                </a>
              </div>
            </nav>
          </aside>

          {/* Content */}
          <div className={styles.settingsContent}>
            {/* Personal Info Section */}
            <section className={styles.settingsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Personal Information</h2>
                <p className={styles.sectionSubtitle}>Update your personal details</p>
              </div>
              <div className={styles.sectionBody}>
                <div className={styles.formGroupRow}>
                  <label className={styles.formLabel}>Profile Picture</label>
                  <div className={styles.avatarUpload}>
                    <div
                      className={styles.profileAvatarLg}
                      style={{ backgroundImage: "url('/images/avatar.png')" }}
                    ></div>
                    <button className={`${styles.button} ${styles.buttonSecondary}`}>
                      Change
                    </button>
                  </div>
                </div>
                <div className={styles.formGroupRow}>
                  <label className={styles.formLabel}>Full Name</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className={styles.formGroupRow}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className={styles.sectionFooter}>
                <button className={`${styles.button} ${styles.buttonSecondary}`}>
                  Cancel
                </button>
                <button className={`${styles.button} ${styles.buttonPrimary}`}>
                  Save Changes
                </button>
              </div>
            </section>

            {/* Appearance Section */}
            <section className={styles.settingsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Appearance</h2>
              </div>
              <div className={styles.sectionBody}>
                <div className={styles.switchContainer}>
                  <span className={styles.switchLabel}>Dark Mode</span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </section>

            {/* Privacy Section */}
            <section className={styles.settingsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Privacy Settings</h2>
                <p className={styles.sectionSubtitle}>Manage your account privacy</p>
              </div>
              <div className={styles.sectionBody}>
                <div className={styles.switchContainer}>
                  <span className={styles.switchLabel}>Show my profile publicly</span>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.switchContainer}>
                  <span className={styles.switchLabel}>Allow direct messages</span>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
              <div className={styles.sectionFooter}>
                <button className={`${styles.button} ${styles.buttonSecondary}`}>
                  Cancel
                </button>
                <button className={`${styles.button} ${styles.buttonPrimary}`}>
                  Save Changes
                </button>
              </div>
            </section>

            {/* Notification Section */}
            <section className={styles.settingsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Notifications</h2>
                <p className={styles.sectionSubtitle}>Control your notification settings</p>
              </div>
              <div className={styles.sectionBody}>
                <div className={styles.switchContainer}>
                  <span className={styles.switchLabel}>Email Notifications</span>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.switchContainer}>
                  <span className={styles.switchLabel}>Push Notifications</span>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.switchContainer}>
                  <span className={styles.switchLabel}>SMS Notifications</span>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
              <div className={styles.sectionFooter}>
                <button className={`${styles.button} ${styles.buttonSecondary}`}>
                  Cancel
                </button>
                <button className={`${styles.button} ${styles.buttonPrimary}`}>
                  Save Changes
                </button>
              </div>
            </section>

            {/* Linked Accounts Section */}
            <section className={styles.settingsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Linked Accounts</h2>
                <p className={styles.sectionSubtitle}>Manage your connected accounts</p>
              </div>
              <div className={styles.sectionBody}>
                <div className={styles.linkedAccount}>
                  <div className={styles.accountInfo}>
                    <svg
                      className={styles.accountIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.225 0H1.771A1.77 1.77 0 0 0 0 1.771v20.451A1.77 1.77 0 0 0 1.771 24h20.451A1.77 1.77 0 0 0 24 22.222V1.771A1.77 1.77 0 0 0 22.225 0zM7.125 20.452H3.556V9h3.569v11.452zM5.34 7.452a2.067 2.067 0 1 1 0-4.134 2.067 2.067 0 0 1 0 4.134zM20.444 20.452h-3.569v-5.672c0-1.352-.027-3.092-1.884-3.092-1.887 0-2.175 1.474-2.175 2.996v5.768H9.247V9h3.425v1.561h.047c.478-.9 1.64-1.848 3.376-1.848 3.611 0 4.349 2.376 4.349 5.465v6.274z" />
                    </svg>
                    <span className={styles.accountName}>LinkedIn</span>
                  </div>
                  <button className={`${styles.button} ${styles.buttonSecondary}`}>
                    Disconnect
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main >
    </div >
  );
};

export default Profile;