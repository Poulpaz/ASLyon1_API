var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

exports.events = function(req, res, next) {
    connectionOnline.query("SELECT * FROM event", function(err, result, fields) {
        if(err) {
            throw err;
        } else {
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                console.log(row.title);
            });
            res.json(result);
        }
    });
}

exports.event = function(req, res, next) {
    var idEvent = req.params.idEvent;
    var row;
    connectionOnline.query("SELECT * FROM event WHERE idEvent=" + idEvent + "", function(err, result, fields) {
        if(err) {
            throw err;
        } else {
            res.json(row);
        }
    });
}