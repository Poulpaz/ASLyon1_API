var request = require('request');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();

/* Get RSS Flux from AS Lyon 1 */
exports.listActuRss = function(req, res) {
    request.get('https://as.univ-lyon1.fr/feed/', function(error, response, body) {
        //sendJsonResponse(res, 200, body);
        var json = parser.parseString(body);
        res.send(json);
    });
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};