var express = require('express');
var routes = require('./routes/index');

var app = express();
var allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Cache-Control,Authorization');
   next();
}
app.use(allowCrossDomain);
app.use('/', routes);

module.exports = app;
