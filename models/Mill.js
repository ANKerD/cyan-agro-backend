const Sequelize = require("sequelize");
const db = require("./db");
const Harvest = require("./Harvest");
const msgs = require("../constants/messages");

const MillSchema = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: { msg: msgs.NAME_IN_USE },
    validate: {
      notEmpty: { args: [true], msg: msgs.BLANK_NAME }
    }
  },
  image: {
    type: Sequelize.STRING
  }
};

const Mill = db.define("mill", MillSchema);

Mill.hasMany(Harvest, { onDelete: "cascade" });
Harvest.belongsTo(Mill);

module.exports = Mill;
