const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const connectDb = require("./config/database");
const app = require("./app");
const cors = require("cors");

const port = process.env.PORT || 4000;
app.use(cors()); // This will allow all origins
connectDb();

app.listen(port, () => {
  //console.log(`Server running on http://localhost:${port}`);
});
