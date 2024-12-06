const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');
const Order = require('./order');

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

module.exports = { sequelize, initModels, User, Book, Order };
