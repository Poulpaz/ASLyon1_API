module.exports = function(app) {
    console.log("route");

    var userController = require('../controller/userController');

    /* -- routes test - debug -- */
    app.route('/debugMode').get(function (req, res, next) {
        console.log("Hello")        
        res.send("Hello Tristan. API is working... You can begin to use it !")
    });

    /* -- User routes -- */
    //liste des utilisateurs
    app.route('/api/users').get(userController.users);
    //login - connexion
    app.route('/api/login').get(userController.login);
    //sign up - inscription
    app.route('/api/sigup').post(userController.signup);
}