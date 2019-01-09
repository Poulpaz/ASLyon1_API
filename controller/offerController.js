var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

exports.offers = function(req, res, next) {
    connectionOnline.query("SELECT * FROM offer", function(err, result, fields) {
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

exports.offer = function(req, res, next) {
    var idoffer = req.params.idOffer;
    var row;
    connectionOnline.query("SELECT * FROM event WHERE idOffer=" + idoffer + " LIMIT 1", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function (key) {
                row = result[key];
                console.log(row.title);
            });
            res.json(row);
        }
    });
}