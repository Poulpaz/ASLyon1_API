module.exports = function(app) {
    console.log("route");

    var userController = require('../controller/userController');

    /* -- outes test - debug -- */
    app.route('/debugMode').get(function (req, res, next) {
        console.log("Hello")        
        res.send("Hello Tristan. API is working... You can begin to use it !")
    });

    app.route('/api/users').get(userController.users);
}