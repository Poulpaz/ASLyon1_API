var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

var notificationController = require('../controller/notificationController');

function replaceCharacters(chn) {
    return chn.replace("\'", "\\'");
}

//liste des offres promotionnelles
exports.offers = function(req, res, next) {
    connectionOnline.query("SELECT * FROM offer ORDER BY idOffer DESC", function(err, result, fields) {
        if(err) {
            throw err;
        } else {
            res.json(result);
        }
    });
}

//récupérer une offre promotionnelle
exports.offer = function(req, res, next) {
    var idoffer = req.params.idOffer;
    var row;
    connectionOnline.query("SELECT * FROM offer WHERE idOffer=" + idoffer + " LIMIT 1", function (err, result, fields) {
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

//notifier l'offre
function notificationOffer() {
    connectionOnline.query("SELECT idOffer, title FROM offer ORDER BY idOffer DESC LIMIT 1", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function (key) {
                rowIdOffer = result[key].idOffer;
                rowTitle = result[key].title;
            });
            notificationController.notificationOffer(rowTitle, rowIdOffer);
        }
    });
}

//ajouter une offre promotionnelle
exports.addOffer = function (req, res, next) {
    var title = replaceCharacters(req.body.title);
    var date = req.body.date;
    var nbParticipants = req.body.nbParticipants;
    var price = req.body.price;
    var description = replaceCharacters(req.body.description);
    connectionOnline.query("INSERT INTO offer (title, date, nbParticipants, price, description) VALUES ('" + title + "', '" + date + "', '" + nbParticipants + "', '" + price + "', '" + description + "')", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("Offer has been added");
            notificationOffer();
            res.json({ message: "Offre promotionnelle ajoutée avec succès." });
        }
    });
}

//mettre à jour une offre promotionnelle
exports.updateOffer = function (req, res, next) {
    var idOffer = req.body.idoffer;
    var title = replaceCharacters(req.body.title);
    var date = req.body.date;
    var nbParticipants = req.body.nbParticipants;
    var price = req.body.price;
    var description = replaceCharacters(req.body.description);
    connectionOnline.query("UPDATE offer SET title='" + title + "', date='" + date + "', nbParticipants='" + nbParticipants + "', price='" + price + "', description='" + description + "' WHERE idOffer='" + idOffer + "'", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("Offer has been updated.");
            res.json({ message: "Les informations de l'offre promotionnelle ont été modifiées avec succès." });
        }
    });
}

//supprimer une offre promotionnelle
exports.deleteOffer = function (req, res, next) {
    var idOffer = req.body.idoffer;
    connectionOnline.query("DELETE FROM offer WHERE idOffer=" + idOffer + "", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("Offer has been deleted.");
            res.json({ message: "Votre offre promotionnelle à bien été supprimée." });
        }
    });
}