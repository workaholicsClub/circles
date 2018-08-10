let makeUserModel = require('../databaseModels/User.js');

function deepClone(objectToClone) {
    return JSON.parse(JSON.stringify(objectToClone));
}

function UserMapper(database, types) {
    this.database = database;
    this.types = types;

    this.createTable = function () {
        let user = makeUserModel(database, types);
        return user.sync();
    };

    this.create = function (uuid, userProps) {
        let createProps = deepClone(userProps);
        createProps.uuid = uuid;

        let user = makeUserModel(this.database, this.types);

        return new Promise(function (resolve, reject) {
            user.create(createProps)
                .then(function () {
                    return user.find({where: {uuid: uuid}});
                })
                .then(function (foundUser) {
                    resolve(foundUser);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    };
    
    this.update = function (uuid, propsToUpdate) {
        let updateProps = deepClone(propsToUpdate);
        let user = makeUserModel(this.database, this.types);

        return new Promise(function (resolve, reject) {
            user.find({where: {uuid: uuid}})
                .then(function (foundUser) {
                    return foundUser.updateAttributes(updateProps);
                })
                .then(function (updatedUser) {
                    resolve(updatedUser);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    };

    this.find = function (uuid) {
        let user = makeUserModel(this.database, this.types);
        return user.find({where: {uuid: uuid}});
    }
}

module.exports = function (database, types) {
    return new UserMapper(database, types);
};