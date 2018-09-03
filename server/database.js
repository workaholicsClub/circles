const Sequelize = require('sequelize');

let username = process.env.MYSQL_USER || '';
let password = process.env.MYSQL_PASSWORD || '';
let host = 'database';
let dbName = process.env.MYSQL_DATABASE || '';

const database = new Sequelize('mysql://' + username + ':' + password + '@' + host + ':3306/' + dbName, {});

function connection() {
    return database;
}

module.exports=connection;