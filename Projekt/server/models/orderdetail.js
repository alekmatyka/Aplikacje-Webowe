const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const OrderDetail = sequelize.define('OrderDetail', {

    orderid:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,

    }
},
{
    updatedAt:false,
    createdAt: false
});

module.exports = OrderDetail;
