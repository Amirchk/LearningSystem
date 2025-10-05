import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, unique: true, sparse: true },
  picture: {
    data: Buffer,
    contentType: String
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: String,
  semester: String,
  strengths: [String],
  difficulties: [String],
  studyStyle: String,
  availability: String,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  completedModules: { type: Number, default: 0 },
  studyHours: { type: Number, default: 0 },
});
studentSchema.index({ strengths: 1, difficulties: 1, studyStyle: 1 });

// Model name "Student" → collection will be "students"
export default mongoose.model("Student", studentSchema);
