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
    connectionOnline.query("SELECT user.idUser, user.lastname, user.firstname, tournament.idTournament, tournament.title, team.idTeam, team.teamName, teamPlayers.idTeamPlayers, teamPlayers.lastnameSubscriber, teamPlayers.firstnameSubscriber FROM subscribe_tournament, user, tournament, team, teamPlayers WHERE team.user_idUser = user.idUser AND teamPlayers.team_idTeam = team.idTeam AND subscribe_tournament.team_idTeam = team.idTeam AND subscribe_tournament.tournament_idTournament = tournament.idTournament AND tournament.idTournament= '" + idTournament + "'", function(err, result, fields) {
        if(err) { throw err; }
        else { res.json(result); }
    });
}

//Lister toutes les équipes inscrites à un tournoi
exports.subscribe_tournamentTeams = function(req, res, next) {
    var idTournament = req.params.idTournament;
    connectionOnline.query("SELECT user.idUser, user.lastname, user.firstname, team.idTeam, team.teamName FROM user, tournament, team WHERE team.user_idUser = user.idUser AND tournament.idTournament= '" + idTournament + "'", function(err, result, fields) {
        if(err) { throw err; }
        else { res.json(result); }
    });
}

//Lister les joueurs d'une équipe
exports.subscribe_tournamentTeamsPlayers = function(req, res, next) {
    var idTeam = req.params.idTeam;
    connectionOnline.query("SELECT teamPlayers.idTeamPlayers, teamPlayers.lastnameSubscriber, teamPlayers.firstnameSubscriber FROM user, team, teamPlayers WHERE team.user_idUser = user.idUser AND teamPlayers.team_idTeam = team.idTeam AND team.idTeam= '" + idTeam + "'", function(err, result, fields) {
        if(err) { throw err; }
        else { res.json(result); }
    });
}

//Création de l'équipe
function createTeam(idUser, teamName) {
    connectionOnline.query("INSERT INTO team (teamName, user_idUser) VALUES ('" + teamName + "', '" + idUser + "')", function (err, result, fields) {
        if(err) { throw err; }
        else { return; }
    });
}

//Insérer un joueur
function insertPlayerIntoDB(idTeam, lastnameSubscriber, firstnameSubscriber) {
    connectionOnline.query("INSERT INTO teamPlayers (team_idTeam, lastnameSubscriber, firstnameSubscriber) VALUES ('" + idTeam + "', '" + lastnameSubscriber + "', '" + firstnameSubscriber + "')", function (err, result, fields) {
        if(err) { throw err; }
        else { return; }
    });
}

//Récupérer l'ID de l'équipe
function getIdTeamByDesc() {
    connectionOnline.query("SELECT idTeam FROM team ORDER BY idTeam DESC LIMIT 1", function (err, result, fields) {
        if(err) { throw err; }
        else { return result; }
    });
}

//S'inscrire à un tournoi
exports.addSubscribe_tournament = function(req, res, next) {
    var teamName = req.body.teamName;
    var user_idUser = req.body.idUser;
    var listTeamPlayers = req.body.listTeamPlayers;
    var tournament_idTournament = req.body.idTournament;
    createTeam(user_idUser, teamName);
    var idTeam = getIdTeamByDesc();

    console.log("teamName : " + teamName);
    console.log("user_idUser : " + user_idUser);
    console.log("tournament_idTournament : " + tournament_idTournament);

    Object.keys(listTeamPlayers).forEach(function (key) {
        var lastnameSubscriber = listTeamPlayers[key].lastnameSubscriber;
        var firstnameSubscriber = listTeamPlayers[key].firstnameSubscriber;
        console.log(lastnameSubscriber + " " + firstnameSubscriber);
        insertPlayerIntoDB(idTeam, lastnameSubscriber, firstnameSubscriber);
    });

    connectionOnline.query("INSERT INTO subscribe_tournament (tournament_idTournament, team_idTeam) VALUES ('" + tournament_idTournament + "', '" + idTeam + "')", function (err, result, fields) {
        if(err) { throw err; }
        else { res.json( { message: "done" } ); }
    });
}