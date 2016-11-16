var express = require('express');
var util = require('../utility');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');


router.get('/', function(req, res) {
    var user ={
        email:'mmoultrie@gmail.com',
        test:'testing'
    };

    var token = util.createToken(user);
    // return the information including token as JSON
    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });

});

module.exports = router;