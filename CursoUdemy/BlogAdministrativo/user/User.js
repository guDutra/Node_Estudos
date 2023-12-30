const Sequelize = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = User;