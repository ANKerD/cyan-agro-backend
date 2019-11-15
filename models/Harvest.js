const Sequelize = require("sequelize");
const moment = require("moment");
const Farm = require("./Farm");
const db = require("./db");
const { INVALID_DATE_RANGE } = require("../constants/messages");

const HarvestSchema = {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
};

const validate = {
  checkDates() {
    if (moment(this.endDate).isBefore(this.startDate)) {
      throw new Error(INVALID_DATE_RANGE);
    }
  }
};

const Harvest = db.define("harvest", HarvestSchema, { validate });

Farm.belongsTo(Harvest, { onDelete: "cascade" });
Harvest.hasMany(Farm);

module.exports = Harvest;
