import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  points: Number,
  assignmentGroup: String,
  submissionType: String,
  dueDate: Date,
  availableFrom: Date,
  availableUntil: Date,
  course: { type: String, ref: "CourseModel" },
}, { collection: "assignments" });

export default assignmentSchema;