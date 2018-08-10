let express = require('express');
const database = require('../database.js');
const types = require('sequelize');
let makeUserMapper = require('../mappers/User.js');
let router = express.Router();

function uuid4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (cc) {
        let rr = Math.random() * 16 | 0;
        return (cc === 'x' ? rr : (rr & 0x3 | 0x8)).toString(16);
    });
}

router.post('/create', function(req, res) {
    let uuid = req.param('uuid', uuid4());
    let userProps = req.body;

    makeUserMapper(database, types).create(uuid, userProps)
        .then(function (createdUser) {
            res.json(createdUser);
        })
        .catch(function (error) {
            res.json({
                success: false,
                error: error
            });
        });
});

router.post('/update', function(req, res) {
    let uuid = req.param('uuid', uuid4());
    let userProps = req.body;

    makeUserMapper(database, types).update(uuid, userProps)
        .then(function (updatedUser) {
            res.json(updatedUser);
        })
        .catch(function (error) {
            res.json({
                success: false,
                error: error
            });
        });
});

router.get('/info', function(req, res) {
    let uuid = req.param('uuid', uuid4());

    makeUserMapper(database, types).find(uuid)
        .then(function (foundUser) {
            res.json(foundUser);
        })
        .catch(function (error) {
            res.json({
                success: false,
                error: error
            });
        });
});

module.exports = router;
