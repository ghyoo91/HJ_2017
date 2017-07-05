var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");
var mongoose = require("mongoose");

var app = express();

app.set('views', path.join( __dirname, '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(8000, function(){
 console.log("Server Start : portNo. " + server.address().port);
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
 secret: '!@#QWERTY#@!',
 resave: false,
 saveUninitialized: true
}));

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("MongoDB Server Connect");
});
mongoose.connect('mongodb://localhost/devices');

var device = require('./models/device.js');
var router = require('./router/main')(app, device);
