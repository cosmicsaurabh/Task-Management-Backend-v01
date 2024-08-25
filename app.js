const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

const taskRouter = require("./routes/tasksRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/auth", userRouter);
app.use("/api/v1", taskRouter);

const corsOptions = {
  origin: process.env.BASE_CORS_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

module.exports = app;
