var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

function getAllPuppies(req, res, next) {
  db.any('select * from ' + process.env.TABLE)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from ' + process.env.TABLE + ' where id = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy
};
