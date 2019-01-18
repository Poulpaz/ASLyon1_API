var connexion = require('../connexion/connexion');
var connectionOnline = connexion.connectionOnline;

//Lister les comptes utilisateurs existants
exports.users = function (req, res, next) {
    connectionOnline.query("SELECT * FROM user", function (err, result, fields) {
        if(err) { throw err; }
        else { res.json(result); }
    });
}

//Récupérer un utilisateur
exports.getUser = function (req, res, next) {
    var idUser = req.params.idUser;
    var row;
    connectionOnline.query("SELECT * FROM user WHERE idUser='" + idUser + "'", function (err, result, fields) {
        if(err) { throw err; }
        else {
            Object.keys(result).forEach(function (key) { row = result[key]; });
            if(row != null) { res.json(row); }
            else { res.json({ message: "Utilisateur inexistant." }); }
        }
    });
}

//Login - Connexion
exports.login = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var row;
    connectionOnline.query("SELECT * FROM user WHERE email='" + email + "' AND password='" + password + "'", function (err, result, fields) {
        if (err) { throw err; }
        else {
            Object.keys(result).forEach(function (key) { row = result[key]; });
            if(row != null) { res.json(row); }
            else { res.json({ error: "Informations incorrectes, veuillez réessayer." }); }
        }
    });
}

//Signup - Inscription
exports.signup = function (req, res, next) {
    var token = req.headers.token;
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var dateOfBirth = req.body.dateofbirth;
    var email = req.body.email;
    var password = req.body.password;
    var phoneNumber = req.body.phonenumber;
    connectionOnline.query("INSERT INTO user (token, lastname, firstname, dateOfBirth, email, password, phoneNumber) VALUES ('" + token + "', '" + lastname + "', '" + firstname + "', '" + dateOfBirth + "', '" + email + "', '" + password + "', '" + phoneNumber + "')", function (err, result, fields) {
        if (err) { throw err; }
        else { res.json({ message: "Inscription effectuée avec succès." }); }
    });
}

//Récupérer un profil utilisateur
exports.connectedUser = function (req, res, next) {
    var token = req.headers.token;
    var row;
    connectionOnline.query("SELECT * FROM user WHERE token='" + token + "'", function (err, result, fields) {
        if (err) { throw err; }
        else {
            Object.keys(result).forEach(function (key) { row = result[key]; });
            if(row != null) { res.json(row); }
            else { res.json({ error: "L'utilisateur n'a pas pu être récupéré" }); }
        }
    });
}

//Modifier un compte utilisateur existant
exports.updateUser = function (req, res, next) {
    var token = req.headers.token;
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var dateOfBirth = req.body.dateofbirth;
    var email = req.body.email;
    var password = req.body.password;
    var phoneNumber = req.body.phonenumber;
    connectionOnline.query("UPDATE user SET lastname='" + lastname + "', firstname='" + firstname + "', dateOfBirth='" + dateOfBirth + "', email='" + email + "', password='" + password + "', phoneNumber='" + phoneNumber + "' WHERE token='" + token + "'", function (err, result, fields) {
        if (err) { throw err; }
        else { res.json({ message: "Vos informations personnelles ont bien été mises à jour." }); }
    });
}

//Supprimer un compte utilisateur existant
exports.deleteUser = function (req, res, next) {
    var token = req.headers.token;
    connectionOnline.query("DELETE FROM user WHERE token=" + token + "", function (err, result, fields) {
        if (err) { throw err; }
        else { res.json({ message: "Votre compte à bien été supprimé." }); }
    });
}