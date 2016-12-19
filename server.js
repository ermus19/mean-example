var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require('morgan');
var app = express();

var routes = require("./routes/index");
var config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(morgan('dev'));

app.use('/', routes);
app.set('secretToken', config.secret);

mongoose.connect(config.database_uri, config.database_options, function (err, res) {
	
	if (err) {
		console.log("Error mongoDB: " + err);
	}
	else {
		console.log("Connected to " + config.database_uri);
	}
	
});
// conectamos el servidor node al puerto 3000
var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log("Server running on ", port);
})