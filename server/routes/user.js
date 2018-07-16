let express = require('express');
let User = require('../mappers/user.js');
let router = express.Router();

function uuid4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (cc) {
        let rr = Math.random() * 16 | 0;
        return (cc === 'x' ? rr : (rr & 0x3 | 0x8)).toString(16);
    });
}

router.post('/create', function(req, res, next) {
    let uuid = req.param('uuid', uuid4());
    let userProps = req.body;
    userProps.uuid = uuid;

    User.create(userProps)
    .then(function () {
        return User.findOrCreate({where: {uuid: uuid}});
    })
    .spread(function (user, isCreated) {
        res.json(user);
    });
});

module.exports = router;
