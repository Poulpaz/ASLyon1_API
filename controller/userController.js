var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

//liste des utilisateurs
exports.users = function(req, res, next) {
    connectionOnline.query("SELECT * FROM user", function(err, result, fields) {
        if(err) {
            throw err;
        } else {
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                console.log(row.lastname);
            });
            res.json(result);
        }
    });
}

//connexion d'un utilisateur
exports.login = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var row;
    connectionOnline.query("SELECT * FROM user WHERE email='" + email + "' AND password='" + password + "'", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function (key) {
                row = result[key];
            });
            if(row != null) { res.json(row); }
            else { res.json({ error: "Informations incorrectes, veuillez réessayer." }); }
        }
    });
}

//changement du token de l'utilisateur
exports.changeUserToken = function (req, res, next) {
    var token = req.headers.token;
    var newtoken = req.body.newtoken;

    connectionOnline.query("UPDATE user SET token='" + newtoken + "' WHERE token=" + token + "", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("User's token has been updated.");
            res.json({ message: "Le token de l'utilisateur a été mis à jour." });
        }
    });
}

//inscription d'un utilisateur - ajout
exports.signup = function (req, res, next) {
    var token = req.headers.token;
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var dateOfBirth = req.body.dateofbirth;
    var email = req.body.email;
    var password = req.body.password;
    var phoneNumber = req.body.phonenumber;
    connectionOnline.query("INSERT INTO user (token, lastname, firstname, dateOfBirth, email, password, phoneNumber) VALUES ('" + token + "', '" + lastname + "', '" + firstname + "', '" + dateOfBirth + "', '" + email + "', '" + password + "', '" + phoneNumber + "')", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("User has been signed up.");
            res.json({ message: "Inscription effectuée avec succès." });
        }
    });
}

//mise à jour de l'utilisateur
exports.updateUser = function (req, res, next) {
    var token = req.headers.token;
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var dateOfBirth = req.body.dateofbirth;
    var email = req.body.email;
    var password = req.body.password;
    var phoneNumber = req.body.phonenumber;
    connectionOnline.query("UPDATE user SET lastname='" + lastname + "', firstname='" + firstname + "', dateOfBirth='" + dateOfBirth + "', email='" + email + "', password='" + password + "', phoneNumber='" + phoneNumber + "' WHERE token='" + token + "'", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("User has been updated.");
            res.json({ message: "Vos informations personnelles ont bien été mises à jour." });
        }
    });
}

//suppression de l'utilisateur
exports.deleteUser = function (req, res, next) {
    var token = req.headers.token;
    connectionOnline.query("DELETE FROM user WHERE token=" + token + "", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("User has been deleted.");
            res.json({ message: "Votre compte à bien été supprimé." });
        }
    });
}