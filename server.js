var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var settings = require("./app/settings");

mongoose.connect(settings.database.uri);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.enable('trust proxy');

var monsterRoutes = require("./app/routes/monsters");
app.use("/v1/monsters", monsterRoutes);

// Start the server
app.listen(3000);
console.log('Pokemon Data API running on Port 3000');
