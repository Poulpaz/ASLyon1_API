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

//récupération d'un utilisateur
exports.connectedUser = function (req, res, next) {
    var token = req.headers.token;
    connectionOnline.query("SELECT * FROM user WHERE token='" + token + "'", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function (key) {
                row = result[key];
            });
            if(row != null) { res.json(row); }
            else { res.json({ error: "L'utilisateur n'a pas pu être récupéré" }); }
        }
    });
}

//changer le token d'un l'utilisateur
exports.changeUserToken = function (req, res, next) {
    var token = req.headers.token.token;
    var newToken = req.headers.token.newtoken;

    connectionOnline.query("UPDATE user SET token='" + newToken + "' WHERE token=" + token + "", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
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
            res.json({ message: "Inscription effectuée avec succès." });
        }
    });
}

//mettre à jour un utilisateur
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
            res.json({ message: "Vos informations personnelles ont bien été mises à jour." });
        }
    });
}

//supprimer un utilisateur
exports.deleteUser = function (req, res, next) {
    var token = req.headers.token;
    connectionOnline.query("DELETE FROM user WHERE token=" + token + "", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            res.json({ message: "Votre compte à bien été supprimé." });
        }
    });
}