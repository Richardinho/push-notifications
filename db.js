const { password } = require('./config');

var mysql = require('mysql');

var con;

function closeConnection() {
  con.end();
}
function createConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password,
    database: "push_notifications"
  });
}

module.exports.insert = function (subscription) {
  con = createConnection();
  con.connect(function(err) {
    if (err) throw err;
    var sql = `INSERT INTO subscriptions VALUES ('${subscription}')`
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      closeConnection();
    });
  });
};


module.exports.closeConnection = closeConnection;

module.exports.getSubscriptionsFromDatabase = function () {

  return new Promise((resolve, reject) => {
    con = createConnection();
    con.connect(function (err) {
      if (err) resolve([]);
      con.query("SELECT * FROM subscriptions", function (err, result, fields) {
        if (err) resolve([]);
        resolve(result);
      }); 
    });
  });
};
