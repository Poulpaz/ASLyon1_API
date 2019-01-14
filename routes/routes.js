module.exports = function(app) {
    console.log("route");

    var userController = require('../controller/userController');
    var eventController = require('../controller/eventController');
    var tournamentController = require('../controller/tournamentController');
    var offerController = require('../controller/offerController');
    var actuController = require('../controller/actuController');

    /* -- routes test - debug -- */
    app.route('/debugMode').get(function (req, res, next) {
        console.log("Hello")        
        res.send("Hello Tristan. API is working... You can begin to use it !")
    });

    /* -- User routes -- */
    //liste des comptes existants
    app.route('/api/users').get(userController.users);
    //login - connexion
    app.route('/api/login').post(userController.login);
    //sign up - inscription
    app.route('/api/signup').post(userController.signup);
    //modifier le token d'un compte
    app.route('/api/changeToken').put(userController.changeUserToken);
    //modifier un compte
    app.route('/api/changeUserSpecifies').put(userController.updateUser);
    //supprimer un compte
    app.route('/api/removeUser').delete(userController.deleteUser);

    /* -- Event routes -- */
    //lister les événements
    app.route('/api/events').get(eventController.events);
    //récupérer les détails d'un événement
    app.route('/api/event/:idEvent').get(eventController.event);
    //ajouter un événement
    app.route('/api/newEvent').post(eventController.addEvent);
    //modifier un événement
    app.route('/api/changeEventSpecifies').put(eventController.updateEvent);
    //supprimer un événement
    app.route('/api/removeEvent').delete(eventController.deleteEvent);

    /* -- Tournament routes -- */
    //liste des tournois
    app.route('/api/tournaments').get(tournamentController.tournaments);
    //recuperer les details tournois
    app.route('/api/tournament/:idTournament').get(tournamentController.tournament);
    //ajouter un tournoi
    app.route('/api/newTournament').post(tournamentController.addTournament);
    //modifier un tournoi
    app.route('/api/changeTournamentSpecifies').put(tournamentController.updateTournament);
    //supprimer un tournoi
    app.route('/api/removeTournament').delete(tournamentController.deleteTournament);

    /* -- Offer routes -- */
    //liste des offres
    app.route('/api/offers').get(offerController.offers);
    //recuperer les details offre
    app.route('/api/offer/:idOffer').get(offerController.offer);
    //ajouter un tournoi
    app.route('/api/newOffer').post(offerController.addOffer);
    //modifier un tournoi
    app.route('/api/changeOfferSpecifies').put(offerController.updateOffer);
    //supprimer un tournoi
    app.route('/api/removeOffer').delete(offerController.deleteOffer);


    app.route('/api/xml').get(actuController.listActuRss);
}