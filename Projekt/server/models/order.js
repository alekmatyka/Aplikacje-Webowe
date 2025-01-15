const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Order = sequelize.define('Order', {

    orderid:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
        
    },
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},
{
    updatedAt:false,
    createdAt: true
});

module.exports = Order;
