require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`listening on ${port}`);
})