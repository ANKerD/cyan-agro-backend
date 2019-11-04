const Sequelize = require('sequelize');

const FarmSchema = {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        alloweNull: false
    }
}

module.exports = FarmSchema;