module.exports = function(app) {

    //Déclaration des contrôleurs
    var userController = require('../controller/userController');
    var eventController = require('../controller/eventController');
    var tournamentController = require('../controller/tournamentController');
    var offerController = require('../controller/offerController');
    var actuController = require('../controller/actuController');
    var subscribe_eventController = require('../controller/subscribe_eventController');

    /* -- Routes test - Debug -- */
    app.route('/debugMode').get(function (req, res, next) {
        console.log("Hello")        
        res.send("Hello Tristan. API is working... You can begin to use it !")
    });

    /* -- User routes -- */
    //Lister les comptes utilisateurs existants
    app.route('/api/users').get(userController.users);
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
    //Lister toutes les inscriptions à tout les événements
    app.route('/api/subscribe_event/:idEvent').get(subscribe_eventController.subscribe_event);
    //S'inscrire à un événement
    app.route('/api/newSubscribe_event').post(subscribe_eventController.addSubscribe_event);
    //Se désinscrire d'un événement
    app.route('/api/removeSubscribe_event').delete(subscribe_eventController.deleteSubscribe_event);
    //Vérifier si un utilisateur est déjà inscrit à un événement
    app.route('/api/isSubscribeEvent').get(subscribe_eventController.isSubscribeEvent);
}