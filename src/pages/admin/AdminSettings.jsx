// SettingsPage.jsx
import React from "react";
import styles from "../../css/admincss/AdminSettings.module.css";

const SettingsPage = () => {
    return (
        <div className={styles.container}>
            {/* Header */}
            <header>
                <div className={styles.headerLeft}>
                    <div className={styles.logo}>
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <h1 className={styles.headerTitle}>Collaborative Learning Partner System</h1>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.notificationBtn}>
                        <svg
                            className={styles.notificationIcon}
                            fill="currentColor"
                            viewBox="0 0 256 256"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                        </svg>
                    </button>
                    <div
                        className={styles.profileAvatar}
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLUeE3iyfTUxp8w6ydQ_DmjkZDj2JBrA2F9a5e8qldZLlMA4jlo8uptJCsyWhBC73xiVa3gruoRLALC41_vhsqJr1kHkWqyqA1zX-XeIrZkKr1gpkmp7mOs31ucZUnX_ncaN4SwKbFBcU2vH0ERUc-uyru2BEFmt5yipX4JYCYrfnq3IGgBXPdkBL6UgLYaHlHx1q17T54vlWRdA1GzcbmyIejm284Q8dN3Hd32hQU23DMo830ncEaHm1Gfl83DVybRwJUuWaOxncs")',
                        }}
                    />
                </div>
            </header>

            {/* Main Content */}
            <main>
                <div className={styles.contentWrapper}>
                    <h1 className={styles.mainTitle}>Admin Settings</h1>
                    <p className={styles.mainSubtitle}>
                        Manage all system settings and configurations from a single, comprehensive page.
                    </p>

                    {/* Display Preferences */}
                    <section className={styles.settingsSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Display Preferences</h2>
                            <p className={styles.sectionDescription}>
                                Control the look and feel of the platform for all users.
                            </p>
                        </div>
                        <div className={styles.settingItem}>
                            <div className={styles.settingItemContent}>
                                <h3>Dark/Light Mode</h3>
                                <p>Toggle between light and dark themes for the platform interface.</p>
                            </div>
                            <div className={styles.settingItemControl}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" defaultChecked />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* User Management */}
                    <section className={styles.settingsSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>User Management</h2>
                            <p className={styles.sectionDescription}>
                                Configure how users are managed on the platform.
                            </p>
                        </div>

                        <div className={styles.settingItem}>
                            <div className={styles.settingItemContent}>
                                <h3>New User Registration</h3>
                                <p>Enable or disable new users from registering on the platform.</p>
                            </div>
                            <div className={styles.settingItemControl}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" defaultChecked />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>

                        <div className={styles.settingItem}>
                            <div className={styles.settingItemContent}>
                                <h3>Require Admin Approval</h3>
                                <p>If enabled, new user registrations will require manual approval by an administrator.</p>
                            </div>
                            <div className={styles.settingItemControl}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>

                        <div className={styles.settingItem}>
                            <div className={styles.settingItemContent}>
                                <h3>Default User Role</h3>
                                <p>Set the default role assigned to new users upon registration.</p>
                            </div>
                            <div className={styles.settingItemControl} style={{ width: "200px" }}>
                                <select className={`${styles.formInput} ${styles.formSelect}`}>
                                    <option>Student</option>
                                    <option>Tutor</option>
                                    <option>Observer</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* System Configuration */}
                    <section className={styles.settingsSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>System Configuration</h2>
                            <p className={styles.sectionDescription}>
                                Manage system-wide settings like time zones and data policies.
                            </p>
                        </div>

                        <div className={styles.settingItem}>
                            <div className={styles.settingItemContent}>
                                <h3>Platform Time Zone</h3>
                                <p>Set the primary time zone for the entire platform. This affects scheduling and deadlines.</p>
                            </div>
                            <div className={styles.settingItemControl} style={{ width: "250px" }}>
                                <select className={`${styles.formInput} ${styles.formSelect}`}>
                                    <option>(GMT-08:00) Pacific Time</option>
                                    <option>(GMT-05:00) Eastern Time</option>
                                    <option>(GMT+00:00) Coordinated Universal Time</option>
                                    <option>(GMT+05:30) India Standard Time</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.settingItem}>
                            <div className={styles.settingItemContent}>
                                <h3>Data Retention Policy</h3>
                                <p>Define how long user data is stored after an account is inactive. Enter the number of days.</p>
                            </div>
                            <div className={styles.settingItemControl} style={{ width: "120px" }}>
                                <input className={styles.formInput} type="number" defaultValue={365} />
                            </div>
                        </div>
                    </section>

                    {/* Notification Preferences */}
                    <section className={styles.settingsSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Notification Preferences</h2>
                            <p className={styles.sectionDescription}>
                                Customize which email notifications are sent to users for platform events.
                            </p>
                        </div>

                        <div className={styles.settingItem}>
                            <div className={styles.settingItemContent}>
                                <h3>User Notifications</h3>
                                <p>Select the notifications that should be enabled by default for all users.</p>
                            </div>
                            <div className={styles.settingItemControl}>
                                <div className={styles.checkboxGroup}>
                                    <label className={styles.checkboxLabel}>
                                        <input type="checkbox" className={styles.checkboxInput} defaultChecked />
                                        New Study Group Match
                                    </label>
                                    <label className={styles.checkboxLabel}>
                                        <input type="checkbox" className={styles.checkboxInput} defaultChecked />
                                        Group Message Notification
                                    </label>
                                    <label className={styles.checkboxLabel}>
                                        <input type="checkbox" className={styles.checkboxInput} />
                                        Upcoming Session Reminder
                                    </label>
                                    <label className={styles.checkboxLabel}>
                                        <input type="checkbox" className={styles.checkboxInput} />
                                        Platform Announcements
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Backup & Export */}
                    <section className={styles.settingsSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Data Backup & Export</h2>
                            <p className={styles.sectionDescription}>
                                Manage automated backups and export system data.
                            </p>
                        </div>

                        <div className={styles.settingItem}>
                            <div className={styles.settingItemContent}>
                                <h3>Automatic Backups</h3>
                                <p>Enable or disable daily automatic backups of the system database.</p>
                            </div>
                            <div className={styles.settingItemControl}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" defaultChecked />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>

                        <div className={styles.settingItem}>
                            <div className={styles.settingItemContent}>
                                <h3>Export User Data</h3>
                                <p>Generate and download a CSV file containing all user data.</p>
                            </div>
                            <div className={styles.settingItemControl}>
                                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                                    <svg
                                        fill="currentColor"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        width="16"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
                                    </svg>
                                    Export Data
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Save All Settings Button */}
                    <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem" }}>
                        <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ minWidth: "150px" }}>
                            Save All Settings
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
