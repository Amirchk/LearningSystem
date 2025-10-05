import React, { useState, useEffect } from "react";
import styles from "../../css/admincss/AdminPanel.module.css"; // adjust path

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [registrationTrend, setRegistrationTrend] = useState(0);

  const [counts, setCounts] = useState({
    totalStudents: 0,
    pendingApprovals: 0,
    activeStudyGroups: 0
  });

  useEffect(() => {
    fetch("http://localhost:5000/admin/dashboard")
      .then(res => res.json())
      .then(data => {
        setCounts({
          totalStudents: data.totalStudents || 0,
          pendingApprovals: data.pendingApprovals || 0,
          activeStudyGroups: data.activeGroups?.length || 0
        });

        setRegistrations(data.registrations || []);

        // Calculate trend (month-over-month)
        if (data.registrations?.length > 1) {
          const lastMonth = data.registrations[data.registrations.length - 1].count;
          const prevMonth = data.registrations[data.registrations.length - 2].count;
          const trend = prevMonth ? Math.round(((lastMonth - prevMonth) / prevMonth) * 100) : 0;
          setRegistrationTrend(trend);
        }
      })
      .catch(err => console.error("Fetch dashboard error:", err));
  }, []);
  const generateLinePath = (data) => {
    if (!data || data.length === 0) return "";
    const maxCount = Math.max(...data.map(d => d.count));
    const stepX = 400 / (data.length - 1);
    let path = `M0 ${150 - (data[0].count / maxCount) * 150}`;
    data.forEach((d, i) => {
      const x = i * stepX;
      const y = 150 - (d.count / maxCount) * 150;
      path += ` L${x} ${y}`;
    });
    return path;
  };



  return (
    <div>
      <header>
        <div className={styles.container}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className={styles.headerLogo}>
              <div className={styles.logoIcon}>
                <svg
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
                </svg>
              </div>
              <h2>Collaborative Learning Partner System</h2>
            </div>
            <div className={styles.headerNav}>
              <nav>
                <a href="#">Dashboard</a>
                <a href="#">Users</a>
                <a href="#">Groups</a>
                <a href="#">Reports</a>
              </nav>
              <button className={styles.notificationButton}>
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div
                className={styles.profileAvatar}
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1jpv_XRmXz25YCu6ADZQK7GTThAilN-KcijqIK7jtYVNsWKXK91HHt4j12ImOxzLIx0pvMwQ8FoQA5wOQa0cEBgQXY0EIOMLUwrZLv96XEuLuDsojPiTeY-mWVrSC1YIYRy93u3DVEYK3vLDA2YRmiEY9O2-IYR-UdnlxSnDPGG0m0TM3jtTvUVrltsPheFx2ihLJEwp_mrAfBIly8GD659Ee2IJ5RgtwyP0kBqtiLLXk1jPFqvvulBa9gl0YUi--ThN5VAL5prOP")',
                }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.container}>
          <div className={styles.dashboardHeader}>
            <h1>Admin Dashboard</h1>
            <p>Overview of platform activity, user registrations, and group monitoring.</p>
          </div>

          <div className={styles.gridContainer}>
            <div className={styles.statCard}>
              <p className={styles.label}>Total Student Registrations</p>
              <p className={styles.value}>{counts.totalStudents}</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.label}>Pending Profile Approvals</p>
              <p className={styles.value}>{counts.pendingApprovals}</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.label}>Active Study Groups</p>
              <p className={styles.value}>{counts.activeStudyGroups}</p>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Platform Analytics</h2>

          <div className={styles.chartCard}>
            <p className={styles.title}>New Student Registrations</p>
            <p className={styles.trend}>
              {registrationTrend >= 0 ? `+${registrationTrend}%` : `${registrationTrend}%`}
            </p>
            <p className={styles.period}>compared to last month</p>
            <div className={styles.chartContainer}>
              <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 400 150" width="100%">
                <path
                  d={generateLinePath(registrations)}
                  fill="url(#gradient)"
                  stroke="#3b82f6"
                  strokeWidth="2"
                ></path>
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="gradient" x1="0" x2="0" y1="0" y2="150">
                    <stop offset="0" stopColor="#3b82f6" stopOpacity="0.1"></stop>
                    <stop offset="1" stopColor="#3b82f6" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>


          <h2 className={styles.sectionTitle}>User Management</h2>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registration Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sophia Clark</td>
                  <td>sophia.clark@email.com</td>
                  <td>2023-08-15</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                      Approved
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionButton}>View Profile</button>
                  </td>
                </tr>
                <tr>
                  <td>Ethan Bennett</td>
                  <td>ethan.bennett@email.com</td>
                  <td>2023-09-02</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusPending}`}>
                      Pending Approval
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionButton}>Approve</button>
                  </td>
                </tr>
                <tr>
                  <td>Olivia Harper</td>
                  <td>olivia.harper@email.com</td>
                  <td>2023-09-10</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                      Approved
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionButton}>View Profile</button>
                  </td>
                </tr>
                <tr>
                  <td>Liam Foster</td>
                  <td>liam.foster@email.com</td>
                  <td>2023-10-01</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                      Approved
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionButton}>View Profile</button>
                  </td>
                </tr>
                <tr>
                  <td>Ava Reynolds</td>
                  <td>ava.reynolds@email.com</td>
                  <td>2023-10-15</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusPending}`}>
                      Pending Approval
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionButton}>Approve</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={styles.sectionTitle}>Report Generation</h2>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Report Type</th>
                  <th>Date Range</th>
                  <th>Generated By</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User Engagement</td>
                  <td>Oct 1 - Oct 31, 2023</td>
                  <td>Admin</td>
                  <td>Completed</td>
                  <td>
                    <button className={styles.actionButton}>Download</button>
                  </td>
                </tr>
                <tr>
                  <td>Group Activity Summary</td>
                  <td>Oct 2023</td>
                  <td>Admin</td>
                  <td>Completed</td>
                  <td>
                    <button className={styles.actionButton}>Download</button>
                  </td>
                </tr>
                <tr>
                  <td>New Registrations</td>
                  <td>Nov 1 - Nov 7, 2023</td>
                  <td>Admin</td>
                  <td>Processing</td>
                  <td>
                    <button className={styles.actionButton} disabled>
                      Processing...
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer>
        <div className={styles.container}>
          <p>© 2024 Collaborative Learning Partner System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
