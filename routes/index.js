var express = require('express');
var router = express.Router();
var userRouter = require('./user');
var mailRouter = require('./mail');
var authRouter = require('./authentication');
var testRouter = require('./test');

router.get('/', function(req, res){
    res.sendStatus(200);
});

router.use('/users', userRouter);
router.use('/mail', mailRouter);
router.use('/authenticate', authRouter);
router.use('/test', testRouter);

module.exports = router;