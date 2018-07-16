const database = require('../database.js');
const Sequelize = require('sequelize');

const User = database().define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.STRING(36),
        allowNull: true,
        defaultValue: null
    },
    dateRegistered: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    birthday: {
        type: 'TIMESTAMP',
        allowNull: true,
        defaultValue: null
    },
    sex: {
        type: Sequelize.STRING(6),
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: Sequelize.STRING(11),
        allowNull: true,
        defaultValue: null
    },
    aim: {
        type: Sequelize.STRING(6),
        allowNull: true,
        defaultValue: null
    },
    education: {
        type: Sequelize.STRING(6),
        allowNull: true,
        defaultValue: null
    },
    phone: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    about: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
    },
    needSex: {
        type: Sequelize.STRING(6),
        allowNull: true,
        defaultValue: null
    },
    needStatus: {
        type: Sequelize.STRING(11),
        allowNull: true,
        defaultValue: null
    },
    needAim: {
        type: Sequelize.STRING(6),
        allowNull: true,
        defaultValue: null
    },
    needEducation: {
        type: Sequelize.STRING(6),
        allowNull: true,
        defaultValue: null
    }
},
{
    timestamps: true,
    createdAt: 'dateRegistered',
    updatedAt: false,
    deletedAt: false
});

module.exports = User;