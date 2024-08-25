const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdat: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "please enter status of task"],
  },
});

module.exports = mongoose.model("Task", taskSchema);
