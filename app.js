const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const taskRouter = require("./routes/tasksRoutes");
const userRouter = require("./routes/userRoutes");
console.log("dfg",process.env.BASE_FRONTEND_CORS_URL)

// const corsOptions = {
//   origin: process.env.BASE_FRONTEND_CORS_URL,
//   credentials: true, //access-control-allow-credentials:true
//   methods: ['GET', "POST", "PUT", "DELETE"],
  
//   optionSuccessStatus: 200,
// };
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
app.use("/api/auth", userRouter);
app.use("/api/v1", taskRouter);


module.exports = app;
