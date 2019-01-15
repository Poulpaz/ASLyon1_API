var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

var notificationController = require('../controller/notificationController');

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

//récupérer un événement
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
    var title = replaceSpecialCharacters(req.body.title);
    var date = req.body.date;
    var place = replaceSpecialCharacters(req.body.place);
    var price = replaceSpecialCharacters(req.body.price);
    var description = replaceSpecialCharacters(req.body.description);
    connectionOnline.query("INSERT INTO event (title, date, place, price, description) VALUES ('" + title + "', '" + date + "', '" + place + "', '" + price + "', '" + description + "')", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("Event has been added");
            notificationEvent();
            res.json({ message: "Evénement ajouté avec succès." });
        }
    });
}

//mettre à jour un événement
exports.updateEvent = function (req, res, next) {
    var idEvent = req.body.idevent;
    var title = req.body.title;
    var date = req.body.date;
    var place = req.body.place;
    var price = req.body.price;
    var description = req.body.description;
    connectionOnline.query("UPDATE event SET title='" + title + "', date='" + date + "', place='" + place + "', price='" + price + "', description='" + description + "' WHERE idEvent='" + idEvent + "'", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("Event has been updated.");
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
            console.log("Event has been deleted.");
            res.json({ message: "Votre événement à bien été supprimé." });
        }
    });
}

function replaceSpecialCharacters(chn) {
    return chn.replace("'", "\'").replace('"', "\"").replace("*", "\*").replace("+", "\+").replace(":", "\:").replace(";", "\;");
}