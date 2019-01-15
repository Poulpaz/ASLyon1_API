
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aslyon1-80c44.firebaseio.com"
});

var topic = "aslyon";

//notification evenements
function notificationEvent(eventTitle) {
  var payload = {
    notification: {
      title: "Nouvel évènement",
      body: eventTitle
    },
    data: {
      idEvent: title
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
}

module.exports = {notificationEvent}