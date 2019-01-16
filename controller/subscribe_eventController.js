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
    var idEvent = req.params.idEvent;
    connectionOnline.query("SELECT user.idUser, user.lastname, user.firstname, event.idEvent, event.title FROM subscribe_event, user, event WHERE subscribe_event.user_idUser = user.idUser AND subscribe_event.event_idEvent = event.idEvent AND event.idEvent= '" + idEvent + "'", function(err, result, fields) {
        if(err) {
            throw err;
        } else {
            res.json(result);
        }
    });
}

//ajouter une incription - événement
exports.addSubscribe_event = function (req, res, next) {
    var idUser = req.body.idUser;
    var idEvent = req.body.idEvent;
    connectionOnline.query("INSERT INTO subscribe_event (user_idUser, event_idEvent) VALUES ('" + idUser + "', '" + idEvent + "')", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            res.json({ message: "Votre inscription a bien été prise en compte." });
        }
    });
}

//supprimer une inscription - événement
exports.deleteSubscribe_event = function (req, res, next) {
    var idUser = req.body.idUser;
    var idEvent = req.body.idEvent;
    connectionOnline.query("DELETE FROM subscribe_event WHERE user_idUser= '" + idUser + "' AND event_idEvent= '" + idEvent + "'", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            res.json({ message: "Votre désinscription à bien été prise en compte." });
        }
    });
}

//liste des inscriptions - événement
exports.isSubscribeEvent = function(req, res, next) {
    var idUser = req.body.idUser;
    var idEvent = req.body.idEvent;
    var row;
    connectionOnline.query("SELECT user.idUser, user.lastname, user.firstname, event.idEvent, event.title FROM subscribe_event, user, event WHERE subscribe_event.user_idUser = user.idUser AND subscribe_event.event_idEvent = event.idEvent AND event.idEvent= '" + idEvent + "' AND event.idEvent= '" + idUser + "'", function(err, result, fields) {
        if(err) {
            throw err;
        } else {
            Object.keys(result).forEach(function (key) {
                row = result[key];
                console.log(row + "     :    One result");
            });
            if(row != []) {
                res.json({ message: 1 });
                console.log(row + "     :    Result full");
            }
            else {
                res.json({ message: 0 });
                console.log(row + "     :    Result empty");
            }
        }
    });
}