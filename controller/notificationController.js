
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aslyon1-80c44.firebaseio.com"
});

//notification evenements
function notificationEvent() {
  var payload = {
    notification: {
      title: "Nouvel évènement",
      body: "The NASDAQ climbs for the second day. Closes up 0.60%."
    }
  };
  
  var topic = "aslyon";
  
  admin.messaging().sendToTopic(topic, payload)
    .then(function(response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
    });
}

notificationEvent()