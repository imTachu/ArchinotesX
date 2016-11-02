var pg = require('pg');
//var connectionString = process.env.DATABASE_URL;
var connectionString = "postgres://test:testtest@test.c4zzuekbjjf5.us-west-2.rds.amazonaws.com:5432/test";

var client = new pg.Client(connectionString);
client.connect();

function getAll(req, res, next) {
  //db.any('select * from ' + process.env.TABLE)
  client.query('select * from ' + "rtuyjjjjj")
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


module.exports = {
  getAll: getAll
};
