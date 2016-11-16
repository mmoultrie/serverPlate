var express = require('express');
var router = express.Router();
var util = require('../utility');
var jwt = require('jsonwebtoken');
var config = require('../config');

router.use(function (req, res, next) {

    util.tokenVerifier(req, res, next)
});
// router.use(function(req,res,next){
//     //var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1tb3VsdHJpZUBnbWFpbC5jb20iLCJ0ZXN0IjoidGVzdGluZyIsImlhdCI6MTQ3OTMzMDIzOSwiZXhwIjoxNDc5NDE2NjM5fQ.TF2KOdm5Cnrrcm84PgJ0BN_YtMatEY4mRFb3rt_UBkca';
//     if (typeof req.body !== 'undefined' ) {
//         var token = req.body.token|| req.query.token || req.headers['x-access-token'];
//         // verifies secret and checks exp
//         jwt.verify(token, config.secret, function(err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//
//     } else {
//
//         // if there is no token
//         // return an error
//         return res.send({
//             success: false,
//             message: 'No token provided.'
//         });
//
//     }
// });

router.get('/', function(req, res) {
    res.sendStatus(200);
});

module.exports = router;