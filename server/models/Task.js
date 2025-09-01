import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    category: {
      type: String,
      enum: ["personal", "work", "shopping", "health", "study", "other"],
      default: "personal"
    },
    reminderEnabled: { type: Boolean, default: true },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
