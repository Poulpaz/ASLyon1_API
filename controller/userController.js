var mysql = require('mysql');
var connectionOnline = mysql.createConnection({
    // properties
    host: 'db4free.net',
    user: 'aslyon1',
    password: 'cWqjRnYLFv84Vkr',
    database: 'aslyon1_api'
});

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

exports.login = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var row;
    connectionOnline.query("SELECT token FROM user WHERE email='" + email + "' AND password='" + password + "'", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function (key) {
                row = result[key];
                console.log(row.firstname);
            });
            if(row != null) { res.json(row); }
            else { res.send({ error: 1 }) }
        }
    });
}

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
            console.log("User has inserted into table ! :)");
        }
    });
}

exports.changeUserToken = function (req, res, next) {
    var token = req.headers.token
    var newtoken = req.body.newtoken;

    connectionOnline.query("UPDATE user SET token='" + newtoken + "' WHERE token=" + token + "", function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            console.log("User has updated into table ! :)");
        }
    });
}