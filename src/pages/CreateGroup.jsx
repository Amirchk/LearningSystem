import { React, useState, useEffect } from 'react';
import Header from '../components/UI Components/Header';
import { Link } from 'react-router-dom';
import styles from "../css/CreateGroup.module.css"

const CreateGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [subjects, setSubjects] = useState("");
    const [description, setDescription] = useState("");
    const [meetingTime, setMeetingTime] = useState("");
    const [membership, setMembership] = useState("open");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newGroup = { name: groupName, subjects, description, meetingTime, membership };

        try {
            const res = await fetch("http://localhost:5000/studygroup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newGroup),
            });

            const data = await res.json();
            if (res.ok) {
                alert("✅ Group created successfully!");
                // Optionally reset the form
                setGroupName("");
                setSubjects("");
                setDescription("");
                setMeetingTime("");
                setMembership("open");
            } else {
                alert(`❌ ${data.message}`);
            }
        } catch (err) {
            console.error("Error creating group:", err);
        }
    };


    return (
        <>
            <Header />
            <div className={styles.mainContainer}>
                <div className={styles.pageHeader}>
                    <h1>Create a New Study Group</h1>
                    <p>Fill out the form below to get your new study group up and running.</p>
                </div>

                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formSection}>
                            <label className={styles.formLabel} htmlFor="group-name">Group Name</label>
                            <input
                                className={styles.formInput}
                                id="group-name"
                                type="text"
                                placeholder="e.g., Quantum Physics Enthusiasts"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </div>

                        <div className={styles.formSection}>
                            <label className={styles.formLabel} htmlFor="subjects">Subject(s)</label>
                            <input
                                className={styles.formInput}
                                id="subjects"
                                type="text"
                                placeholder="e.g., Physics, Mathematics, Computer Science"
                                value={subjects}
                                onChange={(e) => setSubjects(e.target.value)}
                            />
                        </div>

                        <div className={styles.formSection}>
                            <label className={styles.formLabel} htmlFor="description">Description</label>
                            <textarea
                                className={`${styles.formInput} ${styles.formTextarea}`}
                                id="description"
                                placeholder="Describe the goals, topics, and expectations for your group..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className={styles.formSection}>
                            <label className={styles.formLabel} htmlFor="meeting-time">Desired Meeting Times/Frequency</label>
                            <input
                                className={styles.formInput}
                                id="meeting-time"
                                type="text"
                                placeholder="e.g., Tuesdays & Thursdays at 5 PM PST"
                                value={meetingTime}
                                onChange={(e) => setMeetingTime(e.target.value)}
                            />
                        </div>

                        <div className={styles.formSection}>
                            <label className={styles.formLabel}>Membership Options</label>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="membership"
                                        value="open"
                                        checked={membership === "open"}
                                        onChange={(e) => setMembership(e.target.value)}
                                    />
                                    <span className={styles.radioCustom}></span>
                                    <span>Open to Matches</span>
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="membership"
                                        value="invite"
                                        checked={membership === "invite"}
                                        onChange={(e) => setMembership(e.target.value)}
                                    />
                                    <span className={styles.radioCustom}></span>
                                    <span>Invite Specific Members</span>
                                </label>
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <button className={`${styles.btn} ${styles.btnSecondary}`} type="button">Cancel</button>
                            <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">Create Group</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateGroup
