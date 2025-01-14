const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Cart = sequelize.define('Cart', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    productid: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},
{
    updatedAt:false,
    createdAt: false
});

module.exports = Cart;
