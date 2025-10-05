import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import StudyGroup from "./models/StudyGroup.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studybuddy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/", authRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Express server running");
});
// Create a new study group
// Create a new study group
app.post("/studygroup", async (req, res) => {
  const { name, subjects, description, meetingTime, membership } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Group name is required" });
  }

  try {
    const newGroup = new StudyGroup({
      name,
      subjects,
      description,
      meetingTime,
      membership
    });

    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    console.error("Error creating group:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
