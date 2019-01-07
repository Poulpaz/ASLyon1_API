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