var https = require('https');

/* Get RSS Flux from AS Lyon 1 */
exports.listActuRss = function (req, res, next) {
    var option = "https://as.univ-lyon1.fr/feed/";
    var data = "";

    var request = https.get(option, (result) => {
        result.on('data', (d) => {
            data += d;
        });
        result.on('end', function () {
            var actus = JSON.parse(data);
            res.json(actus);
        });
    });
    request.on('error', (e) => {
        console.error(e);
    });
    request.end();
}