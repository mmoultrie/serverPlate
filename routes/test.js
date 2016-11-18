var express = require('express');
var router = express.Router();
var util = require('../utility');
var config = require('../config');
var models = require('../models');
var _model = models.User;


router.get('/', function(req, res) {
    var newUser = {
        email: 'mmoultrie@gmail.com',
        password:'church1'
    };
    var createdUser = {};
    newUser.isActive = false;
    if(newUser){
        _model.create({
            email: newUser.email.toLowerCase(),
            isActive: true,
            emailVerified: false
        }).then(function(user) {
            createdUser = user;
            var salt = util.createSalt(50);
            _model.update({
                password: util.encryptPassword(salt, newUser.password),
                skey: salt
            },{where:{id: user.id }
            }).then(function () {
                util.mailer(createdUser);
                res.send('User Created: ' + createdUser.email)
            }).catch(function (e) {
                res.json({
                    error: 'error creating new user',
                    message: e
                })
            })

        })
    }
});

router.get('/delete', function(req, res) {
    _model.destroy({
        where:{}
    }).then(function (rows) {
        res.send(rows.toString())
    });
});

module.exports = router;