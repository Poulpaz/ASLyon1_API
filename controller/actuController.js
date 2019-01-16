//Instancier du parser
let Parser = require('rss-parser');
let parser = new Parser();

//Lister les actualité - Récupérer le flux RSS
exports.listActuRss = function (req, res) {
    (async () => {
        feed = await parser.parseURL('https://as.univ-lyon1.fr/feed/');
        res.json(feed.items);
    })();
};