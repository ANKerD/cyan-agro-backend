const Sequelize = require('sequelize');

const Mill = {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }   
}