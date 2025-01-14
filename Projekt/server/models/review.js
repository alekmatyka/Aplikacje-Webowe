const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Review = sequelize.define('Review', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userID:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:true
    },
    productid: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
            min: 1, // Minimum value
            max: 5, // Maximum value
            isInt: true, // Must be an integer
          },
    }
},
{
    updatedAt:false,
    createdAt: false
});

module.exports = Review;
