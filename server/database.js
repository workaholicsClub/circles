const Sequelize = require('sequelize');

const database = new Sequelize('mysql://toor:hei6voYi@database:3306/circles', {});

function connection() {
    return database;
}

module.exports=connection;