const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('storedb', 'root', 'password', {
    host: 'localhost',
    dialect: 'sqlite', 
    storage: '../store.sqlite'
});

module.exports = sequelize;
