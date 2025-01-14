const sequelize = require('../config/database');
const User = require('./user');
const Order = require('./order');
const Review = require('./review');
const Cart = require('./cart');
const Product = require('./product');
const OrderDetail = require('./orderdetail');

// Sync models and associations
const initModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        await sequelize.sync();
        console.log('Models synchronized.');
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
};

module.exports = { sequelize, initModels, User, Order, Review, Cart, Product, OrderDetail };
