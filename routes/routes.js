module.exports = function(app) {
    console.log("route");

    var userController = require('../controller/userController');
    var eventController = require('../controller/eventController');
    var tournamentController = require('../controller/tournamentController');

    /* -- routes test - debug -- */
    app.route('/debugMode').get(function (req, res, next) {
        console.log("Hello")        
        res.send("Hello Tristan. API is working... You can begin to use it !")
    });

    /* -- User routes -- */
    //liste des utilisateurs
    app.route('/api/users').get(userController.users);
    //login - connexion
    app.route('/api/login').post(userController.login);
    //sign up - inscription
    app.route('/api/signup').post(userController.signup);
    //change user's token
    app.route('/api/changeToken').put(userController.changeUserToken);

    /* -- Event routes -- */
    //liste des evenements
    app.route('/api/events').get(eventController.events);
    //recuperer les details evenement
    app.route('/api/event/:idEvent').get(eventController.event);

    /* -- Tournament routes -- */
    //liste des tournois
    app.route('/api/tournaments').get(tournamentController.tournaments);

    /* -- Offer routes -- */
    //liste des offres
    
}