const Sequelize = require("sequelize");
const Field = require("./Field");
const db = require("./db");
const msgs = require("../constants/messages");

const FarmSchema = {
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

const Farm = db.define("farm", FarmSchema);

Field.belongsTo(Farm, { onDelete: "cascade" });
Farm.hasMany(Field);

module.exports = Farm;
