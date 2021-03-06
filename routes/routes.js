module.exports = function(app) {

    //Déclaration des contrôleurs
    var userController = require('../controller/userController');
    var eventController = require('../controller/eventController');
    var tournamentController = require('../controller/tournamentController');
    var offerController = require('../controller/offerController');
    var actuController = require('../controller/actuController');
    var notificationController = require('../controller/notificationController');

    var subscribe_eventController = require('../controller/subscribe_eventController');
    var subscribe_tournamentController = require('../controller/subscribe_tournamentController');

    /* -- Routes test - Debug -- */
    app.route('/debugMode').get(function (req, res, next) {
        console.log("Hello")        
        res.send("Hello Tristan. API is working... You can begin to use it !")
    });

    /* -- User routes -- */
    //Lister les comptes utilisateurs existants
    app.route('/api/users').get(userController.users);
    //Récupérer un utilisateur
    app.route('/api/user/:idUser').get(userController.getUser);
    //Login - Connexion
    app.route('/api/login').post(userController.login);
    //Signup - Inscription
    app.route('/api/signup').post(userController.signup);
    //Récupérer un profil utilisateur
    app.route('/api/connectedUser').get(userController.connectedUser);
    //Modifier un compte utilisateur existant
    app.route('/api/changeUserSpecifies').put(userController.updateUser);
    //Supprimer un compte utilisateur existant
    app.route('/api/removeUser').delete(userController.deleteUser);

    /* -- Event routes -- */
    //Lister les événements existants
    app.route('/api/events').get(eventController.events);
    //Récupérer les détails d'un événement existant
    app.route('/api/event/:idEvent').get(eventController.getEvent);
    //Ajouter un événement
    app.route('/api/newEvent').post(eventController.addEvent);
    //Modifier un événement existant
    app.route('/api/changeEventSpecifies').put(eventController.updateEvent);
    //Supprimer un événement existant
    app.route('/api/removeEvent').delete(eventController.deleteEvent);

    /* -- Tournament routes -- */
    //Lister les tournois existants
    app.route('/api/tournaments').get(tournamentController.tournaments);
    //Récupérer les details d'un tournoi existant
    app.route('/api/tournament/:idTournament').get(tournamentController.tournament);
    //Ajouter un tournoi
    app.route('/api/newTournament').post(tournamentController.addTournament);
    //Modifier un tournoi existant
    app.route('/api/changeTournamentSpecifies').put(tournamentController.updateTournament);
    //Supprimer un tournoi existant
    app.route('/api/removeTournament').delete(tournamentController.deleteTournament);

    /* -- Offer routes -- */
    //Lister les offres existantes
    app.route('/api/offers').get(offerController.offers);
    //Récupérer les détails d'une offre existante
    app.route('/api/offer/:idOffer').get(offerController.offer);
    //Ajouter une offre
    app.route('/api/newOffer').post(offerController.addOffer);
    //Modifier une offre existante
    app.route('/api/changeOfferSpecifies').put(offerController.updateOffer);
    //Supprimer une offre existante
    app.route('/api/removeOffer').delete(offerController.deleteOffer);

    /* -- Actu routes -- */
    //Lister les actualité - Récupérer le flux RSS
    app.route('/api/xml').get(actuController.listActuRss);

    /* -- Subscribe Event routes -- */
    //Lister toutes les inscriptions à un événement
    app.route('/api/subscribe_event/:idEvent').get(subscribe_eventController.subscribe_event);
    //S'inscrire à un événement
    app.route('/api/newSubscribe_event').post(subscribe_eventController.addSubscribe_event);
    //Se désinscrire d'un événement
    app.route('/api/removeSubscribe_event/:idUser/:idEvent').delete(subscribe_eventController.deleteSubscribe_event);
    //Vérifier si un utilisateur est déjà inscrit à un événement
    app.route('/api/isSubscribeEvent').post(subscribe_eventController.isSubscribeEvent);

    /* -- Subscribe Tournament routes -- */
    //Lister toutes les inscriptions à un tournoi
    app.route('/api/subscribe_tournamentPlayers/:idTournament').get(subscribe_tournamentController.subscribe_tournamentPlayers);
    //Lister toutes les équipes inscrites à un tournoi
    app.route('/api/subscribe_tournamentTeams/:idTournament').get(subscribe_tournamentController.subscribe_tournamentTeams);
    //Lister les joueurs d'une équipe
    app.route('/api/subscribe_tournamentTeamPlayers/:idTeam').get(subscribe_tournamentController.subscribe_tournamentTeamsPlayers);

    /* -- Notification routes -- */
    app.route('/api/sendNotification').post(notificationController.sendNotification);
}