var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/puppies', db.getAllPuppies);
router.get('/api/puppies/:id', db.getSinglePuppy);

module.exports = router;
