var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

exports.users = function(req, res, next) {
    connectionOnline.query("SELECT * FROM user", function(err, result, fields) {
        if(err) {
            throw err;
        } else {
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                console.log(row.lastname);
            });
            res.json(result);
        }
    });
}

exports.signIn = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.pasword;
    var row;
    connectionOnline.query("SELECT * FROM user WHERE email=" + email + " AND password=" + password + " LIMIT 1", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function (key) {
                row = result[key];
                console.log(row.firstname);
            });
            res.json(row);
        }
    });
}