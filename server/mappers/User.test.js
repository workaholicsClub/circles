const makeUserMapper = require('./User');
const database = require('../testDatabase.js');
const types = require('sequelize');

beforeAll(function () {
    let userMapper = makeUserMapper(database, types);
    return userMapper.createTable();
});

test('Метод create', function () {
    let userMapper = makeUserMapper(database, types);
    let uuid = "49642b99-edd1-4a4d-ae7f-407f36d665dc";
    let userProps = {
        name: "Константин Константинопольский"
    };

    return new Promise(function (resolve, reject) {
        userMapper.create(uuid, userProps)
            .then(function (createdUser) {
                try {
                    expect(createdUser.id).toBeGreaterThan(0);
                    expect(createdUser.name).toEqual(userProps.name);
                    resolve();
                } catch (exception)
                {
                    reject(exception);
                }
            });
    });
});

test('Метод update', function () {
    let userMapper = makeUserMapper(database, types);
    let uuid = "f99ac8bf-9ed4-4504-8eb3-413d01c89969";
    let initialProps = {
        name: "Константин Константинопольский"
    };

    let updatedProps = {
        name: "Сергей Сергиевский"
    };

    let newUserId = false;

    return new Promise(function (resolve, reject) {
        userMapper.create(uuid, initialProps)
            .then(function (createdUser) {
                try {
                    newUserId = createdUser.id;
                    expect(createdUser.id).toBeGreaterThan(0);
                    expect(createdUser.name).toEqual(initialProps.name);
                } catch (exception)
                {
                    reject(exception);
                }
            })
            .then(function () {
                return userMapper.update(uuid, updatedProps);
            })
            .then(function (updatedUser) {
                try {
                    expect(updatedUser.id).toEqual(newUserId);
                    expect(updatedUser.name).toEqual(updatedProps.name);
                    resolve();
                } catch (exception)
                {
                    reject(exception);
                }
            });
    });
});

test('Метод find', function () {
    let userMapper = makeUserMapper(database, types);
    let uuid = "e27b3196-18fd-48a0-84e0-25afaa8160a1";
    let userProps = {
        name: "Константин Константинопольский"
    };

    return new Promise(function (resolve, reject) {
        userMapper.create(uuid, userProps)
            .then(function () {
                return userMapper.find(uuid);
            })
            .then(function (foundUser) {
                try {
                    expect(foundUser.uuid).toEqual(uuid);
                    expect(foundUser.name).toEqual(userProps.name);
                    resolve();
                }
                catch (error) {
                    reject(error);
                }
            });
    });

});