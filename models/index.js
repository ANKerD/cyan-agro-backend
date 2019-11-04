require('dotenv').config()
const Sequelize = require('sequelize');
const FieldSchema = require('./Field');
  

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER_NAME,
  DATABASE_USER_PASSWORD,
} = process.env;

const sequelize = new Sequelize(
  DATABASE_NAME, 
  DATABASE_USER_NAME, 
  DATABASE_USER_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'postgres'
});

module.exports = async function () {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
  
  const Field = sequelize.define('field', FieldSchema);
  await sequelize.sync();
  
  return {Field};
};

module.exports();