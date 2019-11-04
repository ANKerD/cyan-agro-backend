const Sequelize = require("sequelize");
const db = require("./db");

const FieldSchema = {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isLatitude(value) {
        if (!(-90 <= value && value <= 90)) {
          throw new Error("Latitude should be in [-90, 90]");
        }
      }
    }
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isLongitude(value) {
        if (!(-180 <= value && value <= 180)) {
          throw new Error("Longitude should be in [-180, 180]");
        }
      }
    }
  }
};

const Field = db.define("field", FieldSchema);
module.exports = Field;
