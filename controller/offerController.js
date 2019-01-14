var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

//liste des offres promotionnelles
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

//ajouter une offre promotionnelle
exports.addOffer = function (req, res, next) {
    var title = req.body.title;
    var date = req.body.date;
    var nbParticipants = req.body.nbParticipants;
    var price = req.body.price;
    var link = req.body.link;
    var description = req.body.description;
    connectionOnline.query("INSERT INTO offer (title, date, nbParticipants, price, link, description) VALUES ('" + title + "', '" + date + "', '" + nbParticipants + "', '" + price + "', '" + link + "', '" + description + "')", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("Offer has been added");
            res.json({ message: "Offre promotionnelle ajoutée avec succès." });
        }
    });
}

//mettre à jour une offre promotionnelle
exports.updateOffer = function (req, res, next) {
    var idOffer = req.body.idoffer;
    var title = req.body.title;
    var date = req.body.date;
    var nbParticipants = req.body.nbParticipants;
    var price = req.body.price;
    var link = req.body.link;
    var description = req.body.description;
    connectionOnline.query("UPDATE offer SET title='" + title + "', date='" + date + "', nbParticipants='" + nbParticipants + "', price='" + price + "', link='" + link + "', description='" + description + "' WHERE idOffer='" + idOffer + "'", function (err, result, fields) {
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