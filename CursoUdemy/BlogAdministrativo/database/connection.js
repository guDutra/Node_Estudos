const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const connection = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;