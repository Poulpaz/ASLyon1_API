var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

//Lister toutes les inscriptions à un tournoi
exports.subscribe_tournament = function(req, res, next) {
    var idTournament = req.params.idTournament;
    connectionOnline.query("SELECT user.idUser, user.lastname, user.firstname, tournament.idTournament, tournament.title, team.idTeam, teamPlayers.lastname, teamPlayers.firstname FROM subscribe_tournament, user, tournament, team, teamPlayers WHERE team.user_idUser = user.idUser AND teamPlayers.team_idTeam = team.idTeam AND subscribe_tournament.team_idTeam = team.idTeam AND subscribe_tournament.tournament_idTournament = tournament.idTournament AND tournament.idTournament= '" + idTournament + "'", function(err, result, fields) {
        if(err) { throw err; }
        else { res.json(result); }
    });
}