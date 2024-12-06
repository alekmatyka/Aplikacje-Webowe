const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');


const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    
},
{
    updatedAt:false,
    createdAt: false
});

Order.belongsTo(User, {foreignKey: 'userID', as: 'user'})
User.hasMany(Order, {foreignKey: 'userID', as: 'orders'})

// Order.belongsTo(Book)
// Book.hasMany(Order)


module.exports = Order;