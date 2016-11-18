var express = require('express');
var router = express.Router();
//var util = require('../utility');
var config = require('../config');
var models = require('../models');
var _model = models.User;


router.get('/:id', function(req, res) {
    _model.update({
        emailVerified: true
    },{
        where: {id: req.params.id}
    }).then(function () {
        res.send('Account has Been Verified')
    });
});

module.exports = router;