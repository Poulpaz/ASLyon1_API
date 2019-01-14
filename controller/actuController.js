var request = require('request');

/* Get RSS Flux from AS Lyon 1 */
exports.listActuRss = function(req, res) {
    request.get('https://as.univ-lyon1.fr/feed/', function(error, response, body) {
        sendJsonResponse(res, 200, body);
    });
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};