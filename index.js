require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const httpStatusCodes = require("./constants/httpStatusCodes");
const db = require("./models/db");

const millRoutes = require("./routes/millRoutes");
const harvestRoutes = require("./routes/harvestRoutes");
const farmRoutes = require("./routes/farmRoutes");
const fieldRoutes = require("./routes/fieldRoutes");

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/mills", millRoutes);
app.use("/api/harvests", harvestRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/fields", fieldRoutes);

app.use("*", (req, res) => {
  res.status(httpStatusCodes.NOT_FOUND);
  res.json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  const userErrors = [
    "SequelizeValidationError",
    "SequelizeUniqueConstraintError"
  ];

  if (userErrors.includes(err.name)) {
    console.log(err.message);

    err.message = err.errors[0].message || err.message;
    err.status = httpStatusCodes.BAD_REQUEST;
  }

  res.status(err.status || httpStatusCodes.INTERNAL_ERROR);
  res.json({ message: err.message || "Server Error" });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
