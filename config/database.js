const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((data) => {
    //   console.log(`MongoDb connected with server : ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Database connection failed"); // Throw the error to be caught by the route handler
    });
};

module.exports = connectDb;