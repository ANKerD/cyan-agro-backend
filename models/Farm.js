const Sequelize = require("sequelize");
const Field = require("./Field");
const db = require("./db");

const FarmSchema = {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

const Farm = db.define("farm", FarmSchema);

Field.belongsTo(Farm, { onDelete: "cascade" });
Farm.hasMany(Field);

module.exports = Farm;
