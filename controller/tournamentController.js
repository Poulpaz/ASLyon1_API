var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

exports.tournaments = function(req, res, next) {
    connectionOnline.query("SELECT * FROM tournament", function(err, result, fields) {
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

exports.tournament = function(req, res, next) {
    var idtournament = req.params.idTournament;
    var row;
    connectionOnline.query("SELECT * FROM tournament WHERE idTournament=" + idtournament + " LIMIT 1", function (err, result, fields) {
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

//ajout d'un tournoi
exports.addTournament = function (req, res, next) {
    var title = req.body.title;
    var nbTeam = req.body.nbteam;
    var nbPlayersTeam = req.body.nbplayersteam;
    var date = req.body.date;
    var place = req.body.place;
    var description = req.body.description;
    var price = req.body.price;
    connectionOnline.query("INSERT INTO tournament (title, nbTeam, nbPlayersTeam, date, place, description, price) VALUES ('" + title + "', '" + nbTeam + "', '" + nbPlayersTeam + "', '" + date + "', '" + place + "', '" + description + "', '" + price + "')", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("Tournament has been added");
            res.json({ message: "Tournoi ajouté avec succès." });
        }
    });
}

//mise à jour d'un tournoi
exports.updateTournament = function (req, res, next) {
    var idTournament = req.body.idtournament;
    var title = req.body.title;
    var nbTeam = req.body.nbteam;
    var nbPlayersTeam = req.body.nbplayersteam;
    var date = req.body.date;
    var place = req.body.place;
    var description = req.body.description;
    var price = req.body.price;
    connectionOnline.query("UPDATE event SET title='" + title + "', nbTeam='" + nbTeam + "', nbPlayersTeam='" + nbPlayersTeam + "', date='" + date + "', place='" + place + "', description='" + description + "', price='" + price + "' WHERE idTournament='" + idTournament + "'", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("Tournament has been updated.");
            res.json({ message: "Les informations du tournois ont été modifiées avec succès." });
        }
    });
}

//suppression d'un tournoi
exports.deleteTournament = function (req, res, next) {
    var idTournament = req.body.idtournament;
    connectionOnline.query("DELETE FROM tournament WHERE idTournament=" + idTournament + "", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("Tournament has been deleted.");
            res.json({ message: "Votre tournoi à bien été supprimé." });
        }
    });
}