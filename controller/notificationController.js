
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aslyon1-80c44.firebaseio.com"
});

var topic = "aslyon";

//notification evenements
exports.notificationEvent = function(eventTitle, idEvent) {
  var payload = {
    notification: {
      title: "Nouvel évènement",
      body: eventTitle
    },
    data: {
      idEvent: String(idEvent)
    }
  };
  
  var options = {
    priority: "high"
  }
  
  admin.messaging().sendToTopic(topic, payload, options)
    .then(function(response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
    });
};

//notification offre
exports.notificationOffer = function(offerTitle, idOffer) {
  var payload = {
    notification: {
      title: "Nouvelle offre",
      body: offerTitle
    },
    data: {
      idOffer: String(idOffer)
    }
  };
  
  var options = {
    priority: "high"
  }
  
  admin.messaging().sendToTopic(topic, payload, options)
    .then(function(response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
    });
};