var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

var client = new pg.Client(connectionString);
client.connect();

function getAll(req, res, next) {
  client.query('select * from ' + process.env.TABLE)
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
