const app = require("./app");
const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const connectDb = require("./config/database");
// connectDb.catch(err => {
//     // If the connection fails, send a response indicating the issue
//     app.use((req, res, next) => {
//         res.status(500).json({ msg: ['Database connection failed. Please try again later.'] });
//     });
// });

const port = process.env.PORT || 4000;

connectDb();

app.listen(process.env.PORT, () => {
//   console.log(`Server running on http://localhost:${port}`);
});
