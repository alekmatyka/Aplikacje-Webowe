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
        const u = await User.findByPk(1)
        if(!u){
            await User.create({email:"admin@admin.com",password:"1234"})
            await User.create({email:"amatyka@student.agh.edu.pl",password:"4321"})
            await User.create({email:"swozniak@student.agh.edu.pl",password:"kochamWDAI"})
        }
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
};

module.exports = { sequelize, initModels, User, Order, Review, Cart, Product, OrderDetail };
