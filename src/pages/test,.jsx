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
            <a href="#">Groups</a>
            <a href="#">Matches</a>
            <Link to="/Chat" className="header-nav-link" >Chat</Link>
          </nav>
          <div className={styles.headerActions}>
            <button className={styles.notificationBtn}>
              <Link to="/notifications" className="material-symbols-outlined">Notifications</Link>
            </button>
            <img
              alt="User avatar"
              className={styles.userAvatar}
              src={faizanHeaderImg}
            />
          </div>
        </header>