const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
  try {
    // Check if title is provided, if not, set it to "Untitled"
    if (!req.body.title || req.body.title.trim() === "") {
      req.body.title = "Untitled";
    }

    const task = await Task.create(req.body);

    res.status(201).json({
      message: "Task created successfully",
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the task",
      success: false,
      error: error.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  const taskss = await Task.find();

  res.status(200).json({
    success: true,
    taskss,
  });
};

exports.deleteTask = async (req, res) => {
  const id = req.params.id;

  const deletedItem = await Task.findById(id);

  if (!deletedItem) {
    return res
      .status(404)
      .json({ message: "Task already deleted or not found" });
  }
  await deletedItem.deleteOne();

  return res
    .status(200)
    .json({ message: "Task deleted successfully", item: deletedItem });
};

exports.editTask = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);

  task.title = req.body.title;
  task.description = req.body.description;
  task.status = req.body.status;
  await task.save({ validateBeforeSave: false });

  res.status(200).json({
    message: "Task edited successfully",
    success: true,
    task,
  });
};
