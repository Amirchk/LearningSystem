import express from "express";
import mongoose from "mongoose";
import Student from "../models/Student.js";
import StudyGroup from "../models/StudyGroup.js";
import multer from "multer";

const router = express.Router();

// Multer config for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const makeUserSafe = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  rollNumber: user.rollNumber,
  department: user.department,
  semester: user.semester,
  strengths: user.strengths,
  difficulties: user.difficulties,
  studyStyle: user.studyStyle,
  availability: user.availability,
  pictureUrl: `/student/${user._id}/picture`
});


// Signup route with image upload
router.post("/signup", upload.single("picture"), async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rollNumber,
      department,
      semester,
      age,
      studyStyle,
      availability,
      xp,
      quizScore,
      quizTotal
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "⚠️ Name, Email & Password are required" });
    }

    // Check email duplicate
    const emailExists = await Student.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "❌ Email already registered" });

    // Check roll number duplicate
    if (rollNumber) {
      const rollExists = await Student.findOne({ rollNumber });
      if (rollExists) return res.status(400).json({ message: "❌ Roll Number already exists" });
    }

    // Create student
    const newStudentData = { ...req.body };

    if (req.file) {
      newStudentData.picture = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // helper: normalize numeric fields that may come as arrays or strings
    const normalizeNumber = (val) => {
      if (Array.isArray(val)) val = val[val.length - 1]; // take last appended value
      if (val === undefined || val === null) return undefined;
      if (typeof val === "string") val = val.trim();
      const n = Number(val);
      return Number.isFinite(n) ? n : undefined;
    };

    // helper: parse arrays that might be sent as JSON string or CSV
    const parseArrayField = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === "string") {
        try { return JSON.parse(val); } catch { return val.split(",").map(s => s.trim()).filter(Boolean); }
      }
      return [];
    };

    const xpNum = normalizeNumber(req.body.xp);
    const quizScoreNum = normalizeNumber(req.body.quizScore);
    const quizTotalNum = normalizeNumber(req.body.quizTotal);

    const strengths = parseArrayField(req.body.strengths);
    const difficulties = parseArrayField(req.body.difficulties);

    // build user document
    const newUser = new Student({
      name,
      rollNumber,
      email,
      password,
      department,
      semester,
      age: normalizeNumber(req.body.age),
      strengths,
      difficulties,
      studyStyle: req.body.studyStyle,
      availability: req.body.availability,
      xp: xpNum, // will be undefined if not provided or invalid
    });

    // if quiz result sent, append to quizHistory and compute xp if missing
    if (typeof quizScoreNum === "number" && typeof quizTotalNum === "number") {
      const score = quizScoreNum;
      const total = quizTotalNum || 1;
      const xpEarned = xpNum ?? Math.round(100 + (score / Math.max(1, total)) * 100);
      newUser.quizHistory.push({ score, total, xpEarned, date: new Date() });
      newUser.xp = xpEarned;
    }

    const saved = await newUser.save();
    res.status(201).json({ message: "✅ Profile created successfully!" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Student.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  if (user.password !== password)
    return res.status(400).json({ message: "Invalid password" });

  // Exclude picture.data
  const userSafe = {
    _id: user._id,
    name: user.name,
    rollNumber: user.rollNumber,
    email: user.email,
    password: user.password,
    department: user.department,
    semester: user.semester,
    strengths: user.strengths,
    difficulties: user.difficulties,
    studyStyle: user.studyStyle,
    availability: user.availability,
    approved: user.approved,
    createdAt: user.createdAt,
    pictureUrl: `/student/${user._id}/picture`
  };

  res.status(200).json({ message: "Login successful", user: userSafe });
});
router.get("/admin/dashboard", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const pendingApprovals = await Student.countDocuments({ approved: false });
    const activeGroups = await StudyGroup.find({}); // filter if needed
    const registrations = await Student.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({ totalStudents, pendingApprovals, activeGroups, registrations });
  } catch (err) {
    console.error("Admin dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Get profile picture by user id
router.get("/student/:id/picture", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student || !student.picture || !student.picture.data) {
      return res.status(404).send("No picture found");
    }

    res.contentType(student.picture.contentType);
    res.send(student.picture.data);
  } catch (err) {
    console.error("❌ Error fetching picture:", err);
    res.status(500).send("Server error");
  }
});
// record quiz result and update XP
router.post("/student/:id/quiz-result", async (req, res) => {
  try {
    const studentId = req.params.id;
    const { score, total } = req.body;

    if (typeof score === "undefined" || typeof total === "undefined") {
      return res.status(400).json({ message: "score and total required" });
    }

    const scoreNum = Number(score);
    const totalNum = Math.max(1, Number(total));
    if (!Number.isFinite(scoreNum) || !Number.isFinite(totalNum)) {
      return res.status(400).json({ message: "invalid score/total" });
    }

    // XP formula (adjustable)
    const xpEarned = Math.round(100 + (scoreNum / totalNum) * 100);

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // append quiz entry and accumulate XP
    const entry = { score: scoreNum, total: totalNum, xpEarned, date: new Date() };
    student.quizHistory.push(entry);
    student.xp = (Number(student.xp) || 0) + xpEarned;

    await student.save();

    return res.json({ message: "Quiz recorded", xp: student.xp, entry });
  } catch (err) {
    console.error("Error saving quiz result:", err);
    return res.status(500).json({ message: "Server error", error: String(err) });
  }
});

// basic stats endpoint used by Profile.jsx
router.get("/student/:id/stats", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId).lean();
    if (!student) return res.status(404).json({ message: "Student not found" });

    const completedModules = (student.quizHistory || []).length; // example mapping
    const studyHours = Math.floor((student.xp || 0) / 10); // placeholder conversion
    const activeGroups = (student.studyGroups || []).length;

    return res.json({
      completedModules,
      studyHours,
      activeGroups,
      xp: student.xp || 0,
      quizHistory: student.quizHistory || []
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    return res.status(500).json({ message: "Server error", error: String(err) });
  }
});
router.get("/matches/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const currentUser = await Student.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Build base query
    const query = {
      _id: { $ne: userId },
      $or: [
        { strengths: { $in: currentUser.difficulties } },  
        { difficulties: { $in: currentUser.strengths } }   
      ]
    };

    // Add studyStyle & availability filters only if both users have them
    if (currentUser.studyStyle) {
      query.studyStyle = currentUser.studyStyle;
    }
    if (currentUser.availability) {
      query.availability = currentUser.availability;
    }

    const candidates = await Student.find(query);

    res.json({ matches: candidates.map(makeUserSafe) });
  } catch (err) {
    console.error("❌ Match error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
