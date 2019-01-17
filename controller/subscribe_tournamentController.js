var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

//Lister toutes les inscriptions à un tournoi
exports.subscribe_tournamentPlayers = function(req, res, next) {
    var idTournament = req.params.idTournament;
    connectionOnline.query("SELECT user.idUser, user.lastname, user.firstname, tournament.idTournament, tournament.title, team.idTeam, team.teamName, teamPlayers.lastnameSubscriber, teamPlayers.firstnameSubscriber FROM subscribe_tournament, user, tournament, team, teamPlayers WHERE team.user_idUser = user.idUser AND teamPlayers.team_idTeam = team.idTeam AND subscribe_tournament.team_idTeam = team.idTeam AND subscribe_tournament.tournament_idTournament = tournament.idTournament AND tournament.idTournament= '" + idTournament + "'", function(err, result, fields) {
        if(err) { throw err; }
        else { res.json(result); }
    });
}

//Lister toutes les équipes inscrites à un tournoi
exports.subscribe_tournamentTeams = function(req, res, next) {
    var idTournament = req.params.idTournament;
    connectionOnline.query("SELECT user.idUser, user.lastname, user.firstname, team.idTeam, team.teamName FROM user, tournament, team WHERE team.user_idUser = user.idUser AND tournament.idTournament= '" + idTournament + "'", function(err, result, fields) {
        if(err) { throw err; }
        else {
            Object.keys(result).forEach(function (key) {
                rowIdTeam = result[key].idTeam;
                playerData += getPlayersInTeam(rowIdTeam);
            });
            res.json(playerData);
        }
    });
}

//Récupérer les joueurs d'une équipe
function getPlayersInTeam(idTeam) {
    connectionOnline.query("SELECT user.idUser, user.lastname, user.firstname, teamPlayers.lastnameSubscriber, teamPlayers.firstnameSubscriber FROM user, team, teamPlayers WHERE team.user_idUser = user.idUser AND teamPlayers.team_idTeam = team.idTeam AND team.idTeam= '" + idTeam + "'", function (err, result, fields) {
        if (err) { throw err; }
        else {
            return result;
        }
    });
}