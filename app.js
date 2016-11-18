var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var config = require('./config');
var models = require('./models');
var router = require('./routes');
var cors = require('cors');

app.set('secret', config.secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//default get
app.get('/', function (req,res) {
    res.sendStatus(403)
});

app.use(cors());
app.options('*', cors());

//api routes
app.use('/api', router);

models.sequelize.sync().then(function () {
    app.listen(config.port);
});
console.log('Application is running on port: ' + config.port);