const Sequelize = require('sequelize');

const FieldSchema = {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    latitude: {
        type: Sequelize.FLOAT,
        alloweNull: false
    },
    longitude: {
        type: Sequelize.FLOAT,
        alloweNull: false
    },
}

module.exports = FieldSchema;