import mongoose from "mongoose";

const studyGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjects: { type: String },
  description: { type: String },
  meetingTime: { type: String },
  membership: { type: String, enum: ["open", "invite"], default: "open" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("StudyGroup", studyGroupSchema);
