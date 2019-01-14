//var request = require('request');
let Parser = require('rss-parser');
let parser = new Parser();

/* Get RSS Flux from AS Lyon 1 */
exports.listActuRss = function(req, res) {
    (async () => {
 
        feed = await parser.parseURL('https://as.univ-lyon1.fr/feed/');
        console.log(feed.title);
       
        feed.items.forEach(item => {
          console.log(item.title + ':' + item.link)
          res.json(item);
        });
      })();
};