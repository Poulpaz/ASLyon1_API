var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var route = require('./routes/routes');

route(app);
console.log("Server listen on port 5000")
app.listen(process.env.PORT || 5000);