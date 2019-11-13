require("dotenv").config();
const Sequelize = require("sequelize");

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER_NAME,
  DATABASE_USER_PASSWORD
} = process.env;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER_NAME,
  DATABASE_USER_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: "postgres",
    define: {
      timestamps: false
    }
  }
);

module.exports = sequelize;
