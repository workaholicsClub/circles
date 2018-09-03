const Sequelize = require('sequelize');

const database = new Sequelize('sqlite::memory:', {});

function connection() {
    return database;
}

module.exports=connection;