const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    updatedAt:false,
    createdAt: false
});

module.exports = Product;
