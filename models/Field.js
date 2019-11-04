const Sequelize = require('sequelize');

const FieldSchema = {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    latitude: {
        type: Sequelize.FLOAT,
        alloweNull: false,
        validate: {
            len: [-90, 90]
        }
    },
    longitude: {
        type: Sequelize.FLOAT,
        alloweNull: false,
        validate: {
            len: [-180, 180]
        }
    },
}

module.exports = FieldSchema;