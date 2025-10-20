import React, { useState } from 'react';
import styles from '../css/Chat.module.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext";
import Chatbot from "./Chatbot"

const Chat = () => {
    const { darkMode, setDarkMode } = useDarkMode();
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    return (
        <div className={styles.containerWrapper}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.chatListHeader}>
                    <h2>Chats</h2>
                </div>

                <div className={styles.chatListContainer}>
                    {/* Contact - Active */}
                    <div className={`${styles.chatContact} ${styles.active}`}>
                        <div className={styles.chatAvatar}>
                            <img
                                alt="Faizan Sarwar chat head"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3Jdi_WHCnpPj35b_yl5_T4Ffhmk13wRrfRIP7aB-MgkiMz5pL5yoi0SBsfwOXjZyKxoTq25Kn210rs0xv8pW9nEI9FbaSierb32Wiy6z9Bx-_5aZKDmUhSuCmY_Ivm3_7d0HS7FYJnZZ2OIiYP2_qhVO7fLfKVeE9RrtY_u67xRHTqIxp6UX-TLzhYAGD8uRCKAvV1a6tynNL88LErKJy8Y6covrKsIiuYk0wU9fWkQEW7PXGHgHb1HSO_fmWAkFQXnMgIUtUn4DB"
                            />
                            <div claAssName={styles.onlineIndicator}></div>
                        </div>
                        <div className={styles.chatDetails}>
                            <div className={styles.chatHeader}>
                                <p className={styles.chatName}>Faizan Sarwar</p>
                                <p className={styles.chatTime}>2 min</p>
                            </div>
                            <p className={styles.chatMessage}>
                                Yeah, that works for me. See you then!
                            </p>
                        </div>
                    </div>

                    {/* Olivia */}
                    <div className={styles.chatContact}>
                        <div className={styles.chatAvatar}>
                            <img
                                alt="User 1 chat head"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWW3g_eB16HrWRcWBQrn_SCEbDd4WMSWzAWw0LNFmZMTLcPXFOYTaEZ1OU5bCnlDdEOLi9ZXlw3bkEOdEaGUtErcuW1wrgoMI57-wqhwiB4q_6q_HXuNPs44VouCwBf-6cI7dU37QVM1EmjkMOUSt-71zpVUddmNG1uCqDiDdnA78NqWjm8ItyDFnx811zy7nU9ntQpLsrTD1NV4AW8f-nz-ooLUO3NZOu3WO0yzFxS9GwCknrrk8knY-49YJ086hJOSQO8mY8uKnA"
                            />
                        </div>
                        <div className={styles.chatDetails}>
                            <div className={styles.chatHeader}>
                                <p className={styles.chatName}>User 1</p>
                                <p className={styles.chatTime}>15 min</p>
                            </div>
                            <p className={styles.chatMessage}>
                                I have some questions about the last lecture.
                            </p>
                        </div>
                    </div>

                    {/* Liam */}
                    <div className={styles.chatContact}>
                        <div className={styles.chatAvatar}>
                            <img
                                alt="User 2 chat head"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM_3r7_H8h6O6vW4hXqD-c_7dD2o4M4a9bB2bQ9dJ7sE5R1cI0pL4hU6uR6bI2wP5qK3fD1eW8hG5cZ7iL3pG5kH4nN3bQ5rO6pS4tD3uM2eI1zX9tY8vR7uC6gB5aE4dI3fW2gH1iK0jL1qM0nB9cE8dG7fA6bC5eD4cI3bA2"
                            />
                            <div className={styles.onlineIndicator}></div>
                        </div>
                        <div className={styles.chatDetails}>
                            <div className={styles.chatHeader}>
                                <p className={styles.chatName}>User 2</p>
                                <p className={styles.chatTime}>1 hour</p>
                            </div>
                            <p className={styles.chatMessage}>
                                Sure, I can help with the Chemistry problem.
                            </p>
                        </div>
                    </div>

                    {/* Ava */}
                    <div className={styles.chatContact}>
                        <div className={styles.chatAvatar}>
                            <img
                                alt="User 3 chat head"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOoB2H-M5U4G4y4H3q2M5j5B7s6B9k8D7cE6fG5aC4bB3aA2zX1yZ0xW9uV8tS7rQ6pP5oN4mN3lM2kK1jJ0iH9gG8fF7eD6cE5bB4aC3zX2yY1wX9vV8uU7tS6rQ5pP4oN3mM2kL1jJ0iH9gG8fF7eD6cE5bB4aC3zX2yY1wX9"
                            />
                        </div>
                        <div className={styles.chatDetails}>
                            <div className={styles.chatHeader}>
                                <p className={styles.chatName}>Ava Nguyen</p>
                                <p className={styles.chatTime}>Yesterday</p>
                            </div>
                            <p className={styles.chatMessage}>
                                Thanks for the study materials!
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={styles.mainContent}>
                <header className={styles.mainHeader}>
                    <div className={styles.chatPartnerInfo}>
                        <img
                            alt="Faizan Sarwar"
                            className={styles.chatPartnerAvatar}
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx0cR6WOicwaQxwv3Pj5XV4ugqq64FKfQSthliETlKZrLhHR0ovpUu3nW6govH9TLvADYQLUl9oGsOmI6PGiffyNah0p9kmN2VXWCnrr8oQn_johYs8AAPHtujSMJvlWcA1MgQOcApDgQ6VplzQvXlTraYqXRWKBkfrbAD-VMk0xMutEBsnI-lVZC0tsJ5cQuVsBp8q0mH2Js9K2U4IcQ_rS_z7kzJu9fMXZLHqCTN_ykQN5c8dS8Y-3W22_bS6taAR7iIg3NLE_or"
                        />
                        <div className={styles.chatPartnerDetails}>
                            <h3>Faizan Sarwar</h3>
                            <p>Online</p>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <button className={styles.actionBtn}>
                            <span className="material-symbols-outlined">call</span>
                        </button>
                        <button className={styles.actionBtn}>
                            <span className="material-symbols-outlined">videocam</span>
                        </button>
                        <button className={styles.actionBtn}>
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </header>

                <div className={styles.chatWindow}>
                    <div className={`${styles.messageBubble} ${styles.messageReceived}`}>
                        Hey, are you ready for the study session?
                    </div>
                    <p className={`${styles.messageTime} ${styles.messageTimeReceived}`}>
                        10:30 AM
                    </p>

                    <div className={`${styles.messageBubble} ${styles.messageSent}`}>
                        Almost! Just grabbing a coffee. How about we meet at the library in
                        15 minutes?
                    </div>
                    <p className={`${styles.messageTime} ${styles.messageTimeSent}`}>
                        10:32 AM
                    </p>

                    <div className={`${styles.messageBubble} ${styles.messageReceived}`}>
                        Sounds good. I'm already here. I managed to get a table near the
                        window.
                    </div>
                    <p className={`${styles.messageTime} ${styles.messageTimeReceived}`}>
                        10:32 AM
                    </p>

                    <div className={`${styles.messageBubble} ${styles.messageSent}`}>
                        Perfect! I'm on my way now. Did you manage to go over the practice
                        problems for Chapter 5?
                    </div>
                    <p className={`${styles.messageTime} ${styles.messageTimeSent}`}>
                        10:45 AM
                    </p>

                    <div className={`${styles.messageBubble} ${styles.messageReceived}`}>
                        Most of them, yeah. Had a bit of trouble with the last two. Maybe we
                        can tackle them together.
                    </div>
                    <p className={`${styles.messageTime} ${styles.messageTimeReceived}`}>
                        10:46 AM
                    </p>

                    <div className={`${styles.messageBubble} ${styles.messageSent}`}>
                        Yeah, that works for me. See you then!
                    </div>
                    <p className={`${styles.messageTime} ${styles.messageTimeSent}`}>
                        10:47 AM
                    </p>
                </div>

                {/* Chat Input */}
                <div className={styles.chatInputArea}>
                    <div className={styles.inputWrapper}>
                        <button className={styles.actionBtn}>
                            <span className="material-symbols-outlined">add_circle</span>
                        </button>
                        <input
                            className={styles.chatInput}
                            type="text"
                            placeholder="Type a message..."
                        />
                        <button className={styles.sendBtn}>
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>

                {/* Chat Input */}
                {/* Chatbot Toggle Button (replaces checkbox) */}
                <button
                    className={styles.chatbotToggle}
                    onClick={() => setIsChatbotOpen(prev => !prev)}
                    aria-expanded={isChatbotOpen}
                    aria-label={isChatbotOpen ? "Close chatbot" : "Open chatbot"}
                >
                    <span className="material-symbols-outlined">smart_toy</span>
                </button>

                {/* Chatbot Container */}
                <div className={`${styles.chatbotContainer} ${isChatbotOpen ? styles.chatbotOpen : ''}`}>
                    <Chatbot />
                </div>
            </div>
        </div>
    );
};

export default Chat;
