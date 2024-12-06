const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('bookstoredb', 'root', 'password', {
    host: 'localhost',
    dialect: 'sqlite', 
    storage: '../bookstore.sqlite'
});

module.exports = sequelize;
