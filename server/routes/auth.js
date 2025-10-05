import express from "express";
import mongoose from "mongoose";
import Student from "../models/User.js";
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
    const { name, email, password, rollNumber } = req.body;

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

    const newStudent = new Student(newStudentData);
    await newStudent.save();

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
// Get user stats
router.get("/student/:id/stats", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find groups where this student is a member
    const groups = await StudyGroup.find({ members: student._id });

    const stats = {
      completedModules: student.completedModules || 0,
      studyHours: student.studyHours || 0,
      activeGroups: groups.length
    };

    res.json(stats);
  } catch (err) {
    console.error("❌ Error fetching stats:", err);
    res.status(500).json({ message: "Server error" });
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
