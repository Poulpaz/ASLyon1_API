var mysql = require('mysql');

//Récupérer la connexion
function getConnexion() {
    return mysql.createConnection({
        // properties
        host: 'db4free.net',
        user: 'aslyon1',
        password: 'cWqjRnYLFv84Vkr',
        database: 'aslyon1_api'
    });
}

module.exports = {
    getConnexion
};