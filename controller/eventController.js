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
    return chn.replace(/'/g,"\\'");
}

//liste des événements
exports.events = function(req, res, next) {
    connectionOnline.query("SELECT * FROM event ORDER BY idEvent DESC", function(err, result, fields) {
        if(err) {
            throw err;
        } else {
            res.json(result);
        }
    });
}

//récupérer un événement
exports.getEvent = function(req, res, next) {
    var idevent = req.params.idEvent;
    var row;
    connectionOnline.query("SELECT * FROM event WHERE idEvent=" + idevent + " LIMIT 1", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function (key) {
                row = result[key];
            });
            res.json(row);
        }
    });
}

//notifier l'evenement
function notificationEvent() {
    connectionOnline.query("SELECT idEvent, title FROM event ORDER BY idEvent DESC LIMIT 1", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function (key) {
                rowIdEvent = result[key].idEvent;
                rowTitle = result[key].title;
            });
            notificationController.notificationEvent(rowTitle, rowIdEvent);
        }
    });
}

//ajouter un événement
exports.addEvent = function (req, res, next) {
    var title = replaceCharacters(req.body.title);
    var date = req.body.date;
    var place = replaceCharacters(req.body.place);
    var price = req.body.price;
    var description = replaceCharacters(req.body.description);
    connectionOnline.query("INSERT INTO event (title, date, place, price, description) VALUES (" + title + ", " + date + ", " + place + ", " + price + ", " + description + ")", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            notificationEvent();
            res.json({ message: "Evénement ajouté avec succès." });
        }
    });
}

//mettre à jour un événement
exports.updateEvent = function (req, res, next) {
    var idEvent = req.body.idevent;
    var title = replaceCharacters(req.body.title);
    var date = req.body.date;
    var place = replaceCharacters(req.body.place);
    var price = req.body.price;
    var description = replaceCharacters(req.body.description);
    connectionOnline.query("UPDATE event SET title='" + title + "', date='" + date + "', place='" + place + "', price='" + price + "', description='" + description + "' WHERE idEvent='" + idEvent + "'", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            res.json({ message: "Les informations de l'événement ont été modifiées avec succès." });
        }
    });
}

//supprimer un événement
exports.deleteEvent = function (req, res, next) {
    var idEvent = req.body.idevent;
    connectionOnline.query("DELETE FROM event WHERE idEvent=" + idEvent + "", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            res.json({ message: "Votre événement à bien été supprimé." });
        }
    });
}