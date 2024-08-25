const express = require("express");
const { login, register } = require("../controllers/auth.js");

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);

module.exports = userRouter;
