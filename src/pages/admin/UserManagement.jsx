// UserManagement.jsx
import React from "react";
import styles from "../../css/admincss/UserManagement.module.css";

const UserManagement = () => {
  return (
    <div className={styles.pageContainer}>
      <header>
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
          <h2 className={styles.logoText}>
            Collaborative Learning Partner System
          </h2>
        </div>
        <div className={styles.headerActions}>
          <nav>
            <a href="#">Dashboard</a>
            <a href="#" className={styles.active}>
              Users
            </a>
            <a href="#">Groups</a>
            <a href="#">Reports</a>
          </nav>
          <button className={styles.iconButton}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1.25rem" }}
            >
              notifications
            </span>
          </button>
          <div
            className={styles.avatar}
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1jpv_XRmXz25YCu6ADZQK7GTThAilN-KcijqIK7jtYVNsWKXK91HHt4j12ImOxzLIx0pvMwQ8FoQA5wOQa0cEBgQXY0EIOMLUwrZLv96XEuLuDsojPiTeY-mWVrSC1YIYRy93u3DVEYK3vLDA2YRmiEY9O2-IYR-UdnlxSnDPGG0m0TM3jtTvUVrltsPheFx2ihLJEwp_mrAfBIly8GD659Ee2IJ5RgtwyP0kBqtiLLXk1jPFqvvulBa9gl0YUi--ThN5VAL5prOP")',
            }}
          />
        </div>
      </header>

      <main>
        <div className={styles.mainContent}>
          <div className={styles.pageHeader}>
            <h1>User Management</h1>
            <p>Manage all registered users on the platform.</p>
          </div>

          <div className={styles.filtersCard}>
            <div className={styles.filtersContainer}>
              <div className={styles.searchContainer}>
                <span className={`material-symbols-outlined ${styles.searchIcon}`}>
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by name, roll no, etc."
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.filterControls}>
                <select className={styles.filterSelect}>
                  <option>Filter by Department</option>
                  <option>Computer Science</option>
                  <option>Engineering</option>
                  <option>Business</option>
                  <option>Humanities</option>
                </select>

                <select className={styles.filterSelect}>
                  <option>Filter by Status</option>
                  <option>Active</option>
                  <option>Suspended</option>
                </select>

                <button className={styles.applyButton}>Apply Filters</button>
              </div>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>
                    <div className={styles.headerCell}>
                      Name{" "}
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "1rem" }}
                      >
                        unfold_more
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className={styles.headerCell}>
                      Roll Number{" "}
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "1rem" }}
                      >
                        unfold_more
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className={styles.headerCell}>
                      Department{" "}
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "1rem" }}
                      >
                        unfold_more
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className={styles.headerCell}>
                      Status{" "}
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "1rem" }}
                      >
                        unfold_more
                      </span>
                    </div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    name: "Aarav Patel",
                    roll: "CS2024001",
                    dept: "Computer Science",
                    status: "active",
                  },
                  {
                    name: "Priya Singh",
                    roll: "EE2023015",
                    dept: "Engineering",
                    status: "active",
                  },
                  {
                    name: "Rohan Gupta",
                    roll: "BA2025007",
                    dept: "Business",
                    status: "suspended",
                  },
                  {
                    name: "Ananya Sharma",
                    roll: "HU2024021",
                    dept: "Humanities",
                    status: "active",
                  },
                  {
                    name: "Vikram Reddy",
                    roll: "CS2023012",
                    dept: "Computer Science",
                    status: "active",
                  },
                ].map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td className={styles.secondaryText}>{user.roll}</td>
                    <td className={styles.secondaryText}>{user.dept}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${user.status === "active"
                            ? styles.active
                            : styles.suspended
                          }`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button className={styles.actionButton}>
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "1.25rem" }}
                          >
                            visibility
                          </span>
                        </button>
                        <button className={styles.actionButton}>
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "1.25rem" }}
                          >
                            edit
                          </span>
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.delete}`}
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "1.25rem" }}
                          >
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer>
        <p>© 2024 Collaborative Learning Partner System</p>
      </footer>
    </div>
  );
};

export default UserManagement;
