require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const httpStatusCodes = require("./constants/httpStatusCodes");
const db = require("./models/db");

const millRoute = require("./routes/millRoutes");

(async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.log("Error while connecting to database.");
    process.kill(process.pid);
  }
})();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/mills", millRoute);

app.use("*", (req, res) => {
  res.status(httpStatusCodes.NOT_FOUND);
  res.json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || httpStatusCodes.INTERNAL_ERROR);
  res.json({ message: err.message || "Server Error" });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
