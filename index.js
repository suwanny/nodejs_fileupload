// server.js (Express 4.0)
var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    responseTime = require('response-time'),
    app = express(),
    listenPort = 8000;

app.use(express.static(__dirname + '/public'));   // set the static files location /public/img will be /img for users
app.use(morgan('dev'));  // log every request to the console
app.use(responseTime());
app.use(bodyParser.json()); // pull information from html in POST
app.use('/files', require('./lib/files'));

app.listen(listenPort);
console.log('Magic happens on port ' + listenPort);      // shoutout to the user
