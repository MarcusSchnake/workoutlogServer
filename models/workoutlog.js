const  { DataTypes } = require("sequelize");
const db = require("../db");

const workoutlog = db.define("workoutlog",{ //workoutlog has changed to workoutlogs upon creation
    description: {
        type:DataTypes.STRING,
        allowNull: false
    },
    definition: {
        type:DataTypes.STRING,
        allowNull: false
    },
    result: {
        type:DataTypes.STRING,
        allowNull:false
    },
    owner_id: {
        type:DataTypes.INTEGER,
    }
});
module.exports = workoutlog;