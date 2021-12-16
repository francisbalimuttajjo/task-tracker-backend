const mongoose = require("mongoose");

const taskModel = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ["high", "medium", "low"], required: true },
  steps: [mongoose.Schema.Types.Mixed],
  comments: [Object],
  user: {
    type: mongoose.Schema.ObjectId,
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const tasks = mongoose.model("tasks", taskModel);
module.exports = tasks;
