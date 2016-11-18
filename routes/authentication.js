var express = require('express');
var util = require('../utility');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');
var models = require('../models');
var _model = models.User;

router.get('/', function(req, res) {
    res.sendStatus(401);
});

router.post('/', function(req, res) {
    var credentials = req.body;
    if(credentials){
        _model.findOne({
            where:{
                email: credentials.email,
                isActive: true
            }
        }).then(function (user) {
            if(user){
                if(util.isValid(user.skey, credentials.password,user.password)){
                    res.send({
                        token: util.createToken({email:user.email})
                    })
                }else res.sendStatus(401);

            }else res.sendStatus(404);
        })
    }else  res.sendStatus(400);
});

module.exports = router;