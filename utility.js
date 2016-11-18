var jwt = require('jsonwebtoken');
var config = require('./config');
var crypto = require('crypto');

function tokenVerifier(req, res, next) {
    if (typeof req.headers.authorization ) {
        var token = req.headers.authorization;

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Failed to authenticate or session expired.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        //if there is no token
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

}

function createToken(objToSign) {
    var token = jwt.sign(objToSign, config.secret, { expiresIn: 60 * 60 * 24 });
    return token;
}

function createSalt(length) {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
}

function encryptPassword(salt,password) {
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return  value;
}

function isValid(salt,passwordGiven,pass) {
    return encryptPassword(salt, passwordGiven) === pass;
}

function mailer(recipient) {
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Mailgun',
        auth: {
            user: config.mailgun.user,
            pass: config.mailgun.pass
        }
    }));

    var message = {
        from:'Server Tests',
        to: recipient.email,
        subject: 'Verify your new account',
        html: `
            Please Click the link below to verify your new account.
            <a href="`+ config.apiUri+ `/mail/`+ recipient.id +`"> Verify Account</a>
        `

    };

    transporter.sendMail(message, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Sent: ' + info.response);
        }
    });

    transporter.close();

}

module.exports  = {
    tokenVerifier: tokenVerifier,
    createToken: createToken,
    createSalt: createSalt,
    encryptPassword: encryptPassword,
    isValid: isValid,
    mailer: mailer
};


