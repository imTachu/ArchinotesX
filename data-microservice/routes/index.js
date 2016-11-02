var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/' + process.env.TABLE, db.getAll);

module.exports = router;
