var connectionOnline = require('../connexion/connexion');

function replaceCharacters(chn) {
    return chn.replace("\'", "\\'");
}

//Lister les tournois existants
exports.tournaments = function(req, res, next) {
    connectionOnline.query("SELECT * FROM tournament ORDER BY idTournament DESC", function(err, result, fields) {
        if(err) { throw err; }
        else { res.json(result); }
    });
}
//Récupérer les details d'un tournoi existant
exports.tournament = function(req, res, next) {
    var idtournament = req.params.idTournament;
    var row;
    connectionOnline.query("SELECT * FROM tournament WHERE idTournament=" + idtournament + " LIMIT 1", function (err, result, fields) {
        if (err) { throw err; }
        else {
            Object.keys(result).forEach(function (key) { row = result[key]; });
            res.json(row);
        }
    });
}

//Ajouter un tournoi
exports.addTournament = function (req, res, next) {
    var title = replaceCharacters(req.body.title);
    var nbTeam = req.body.nbteam;
    var nbPlayersTeam = req.body.nbplayersteam;
    var date = req.body.date;
    var place = replaceCharacters(req.body.place);
    var description = replaceCharacters(req.body.description);
    var price = req.body.price;
    connectionOnline.query("INSERT INTO tournament (title, nbTeam, nbPlayersTeam, date, place, description, price) VALUES ('" + title + "', '" + nbTeam + "', '" + nbPlayersTeam + "', '" + date + "', '" + place + "', '" + description + "', '" + price + "')", function (err, result, fields) {
        if (err) { throw err; }
        else { res.json({ message: "Tournoi ajouté avec succès." }); }
    });
}

//Modifier un tournoi existant
exports.updateTournament = function (req, res, next) {
    var idTournament = req.body.idtournament;
    var title = replaceCharacters(req.body.title);
    var nbTeam = req.body.nbteam;
    var nbPlayersTeam = req.body.nbplayersteam;
    var date = req.body.date;
    var place = replaceCharacters(req.body.place);
    var description = replaceCharacters(req.body.description);
    var price = req.body.price;
    connectionOnline.query("UPDATE tournament SET title='" + title + "', nbTeam='" + nbTeam + "', nbPlayersTeam='" + nbPlayersTeam + "', date='" + date + "', place='" + place + "', description='" + description + "', price='" + price + "' WHERE idTournament='" + idTournament + "'", function (err, result, fields) {
        if (err) { throw err; }
        else { res.json({ message: "Les informations du tournois ont été modifiées avec succès." }); }
    });
}

//Supprimer un tournoi existant
exports.deleteTournament = function (req, res, next) {
    var idTournament = req.body.idtournament;
    connectionOnline.query("DELETE FROM tournament WHERE idTournament=" + idTournament + "", function (err, result, fields) {
        if (err) { throw err; }
        else { res.json({ message: "Votre tournoi à bien été supprimé." }); }
    });
}