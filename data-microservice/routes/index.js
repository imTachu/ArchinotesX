var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/' + process.env.TABLE, db.getAll);
router.get('/api/' + process.env.TABLE + '/:id', db.getSingle);

module.exports = router;
