const express = require("express");
const {
  getAllTasks,
  createTask,
  deleteTask,
  editTask,
} = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.route("/tasks").get(getAllTasks);
taskRouter.route("/tasks/new").post(createTask);
taskRouter.route("/tasks/delete/:id").delete(deleteTask);
taskRouter.route("/tasks/edit/:id").put(editTask);

module.exports = taskRouter;
