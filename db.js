const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Happy2b1@localhost:5432/workoutlog"); // if fail check here to ensure workoutlog is the correct name to use

module.exports = sequelize;