var connectionOnline = require('../connexion/connexion');

//Instancier le contrôleur de notifications
var notificationController = require('../controller/notificationController');

//Gestion des quotes simples
function replaceCharacters(chn) {
    return chn.replace(/'/g, "\\'");
}

//Lister les offres existantes
exports.offers = function (req, res, next) {
    connectionOnline.query("SELECT * FROM offer ORDER BY idOffer DESC", function (err, result, fields) {
        if(err) { throw err; }
        else { res.json(result); }
    });
}

//Récupérer les détails d'une offre existante
exports.offer = function (req, res, next) {
    var idoffer = req.params.idOffer;
    var row;
    connectionOnline.query("SELECT * FROM offer WHERE idOffer=" + idoffer + " LIMIT 1", function (err, result, fields) {
        if (err) { throw err; }
        else {
            Object.keys(result).forEach(function (key) { row = result[key]; });
            res.json(row);
        }
    });
}

//Notifier les utilisateurs de la création d'une offre
function notificationOffer() {
    connectionOnline.query("SELECT idOffer, title FROM offer ORDER BY idOffer DESC LIMIT 1", function (err, result, fields) {
        if (err) { throw err; }
        else {
            Object.keys(result).forEach(function (key) {
                rowIdOffer = result[key].idOffer;
                rowTitle = result[key].title;
            });
            notificationController.notificationOffer(rowTitle, rowIdOffer);
        }
    });
}

//Ajouter une offre
exports.addOffer = function (req, res, next) {
    var title = replaceCharacters(req.body.title);
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var nbParticipants = req.body.nbParticipants;
    var price = req.body.price;
    var description = replaceCharacters(req.body.description);
    connectionOnline.query("INSERT INTO offer (title, startDate, endDate, nbParticipants, price, description) VALUES ('" + title + "', '" + startDate + "', '" + endDate + "', '" + nbParticipants + "', '" + price + "', '" + description + "')", function (err, result, fields) {
        if (err) { throw err; }
        else {
            notificationOffer();
            res.json({ message: "Offre promotionnelle ajoutée avec succès." });
        }
    });
}

//Modifier une offre existante
exports.updateOffer = function (req, res, next) {
    var idOffer = req.body.idoffer;
    var title = replaceCharacters(req.body.title);
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var nbParticipants = req.body.nbParticipants;
    var price = req.body.price;
    var description = replaceCharacters(req.body.description);
    connectionOnline.query("UPDATE offer SET title='" + title + "', startDate='" + startDate + "', endDate='" + endDate + "', nbParticipants='" + nbParticipants + "', price='" + price + "', description='" + description + "' WHERE idOffer='" + idOffer + "'", function (err, result, fields) {
        if (err) { throw err; }
        else { res.json({ message: "Les informations de l'offre promotionnelle ont été modifiées avec succès." }); }
    });
}

//Supprimer une offre existante
exports.deleteOffer = function (req, res, next) {
    var idOffer = req.body.idoffer;
    connectionOnline.query("DELETE FROM offer WHERE idOffer=" + idOffer + "", function (err, result, fields) {
        if (err) { throw err; }
        else { res.json({ message: "Votre offre promotionnelle à bien été supprimée." }); }
    });
}