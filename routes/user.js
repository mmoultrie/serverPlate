var express = require('express');
var router = express.Router();
var util = require('../utility');
var jwt = require('jsonwebtoken');
var config = require('../config');
var models = require('../models');
var _model = models.User;

router.use(function (req, res, next) {
    util.tokenVerifier(req, res, next)
});


router.get('/', function(req, res) {
    _model.findAll().then(function (list) {
        res.send(list);
    })
});


router.get('/email', function(req, res) {
    var email = req.query.email;
    console.log(email);
    _model.count({
        where: { email: email }
    }).then(function (c) {
        res.send(c.toString());
    })

});


//maybe create should be moved to allow create on login page
router.post('/', function(req, res) {
    var newUser = req.body;
    newUser.isActive = false;
    if(newUser){
        _model.create({
            email: newUser.email.toLowerCase(),
            isActive: true,
            emailVerified: false
        }).then(function(user) {
            var salt = util.createSalt(50);
            _model.update({
                password: util.encryptPassword(salt,newUser.password),
                skey: salt
            },{
                where:{id: user.id }
            }).then(function (user) {
                util.mailer(user);
            }).catch(function (e) {
                res.json({
                    error: 'error creating new user',
                    message: e
                })
            })


        })
    }
});




module.exports = router;