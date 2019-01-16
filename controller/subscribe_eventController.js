var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

//liste des inscriptions - événement
exports.subscribe_event = function(req, res, next) {
    var idSubscribe_event = req.params.idSubscribe_event;
    connectionOnline.query("SELECT user.idUser, user.lastname, user.firstname, event.idEvent, event.title FROM subscribe_event, user, event WHERE subscribe_event.user_idUser = user.idUser AND subscribe_event.event_idEvent = event.idEvent AND event.idEvent= '" + idSubscribe_event + "'", function(err, result, fields) {
        if(err) {
            throw err;
        } else {
            res.json(result);
        }
    });
}

//ajouter une incription - événement
exports.addSubscribe_event = function (req, res, next) {
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

//supprimer une inscription - événement
exports.deleteSubscribe_event = function (req, res, next) {
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