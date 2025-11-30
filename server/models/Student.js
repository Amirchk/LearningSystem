import mongoose from "mongoose";

const QuizEntrySchema = new mongoose.Schema({
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  xpEarned: { type: Number, required: true },
  date: { type: Date, default: () => new Date() }
}, { _id: false });

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  department: { type: String },
  semester: { type: String },
  age: { type: Number },
  strengths: { type: [String], default: [] },
  difficulties: { type: [String], default: [] },
  studyStyle: { type: String },
  availability: { type: String },
  pictureUrl: { type: String },
  xp: { type: Number, default: 100 },
  quizHistory: { type: [QuizEntrySchema], default: [] },
  studyGroups: { type: [String], default: [] } // store group ids or names
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);