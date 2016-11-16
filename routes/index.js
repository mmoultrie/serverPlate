var express = require('express');
var router = express.Router();
var userRouter = require('./user-router');
var authRouter = require('./authentication-router');
var jwt    = require('jsonwebtoken');

router.get('/', function(req, res) {
        res.sendStatus(200);
});
router.use('/users',userRouter);
router.use('/authenticate',authRouter);

module.exports = router;