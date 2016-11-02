var express = require('express');
var routes = require('./routes/index');

var app = express();
app.use('/', routes);

module.exports = app;
