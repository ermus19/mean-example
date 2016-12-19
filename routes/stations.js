var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Station = require("../models/Station");

//Return all stations
router.get('/stations', function (req, res) {
	
		console.log("Sending all Stations...");
	
		Station.find({}, function (err, stations) {
			
			if (err) throw err;
			console.log(stations);
			res.json(stations);
			console.log("All Stations sent!");
			
		});

});
//Create a station
router.post('/stations', function (req, res) {
	
	console.log("Creating new Station...");
	var station = new Station();
	
	station.mac = req.body.mac;
	station.localizacion = req.body.localizacion;
	station.propietario = req.body.propietario;
	
	station.save(function (err) {
		
		if (err) throw err;
		console.log('Station created!');
		res.json({ success: true });
		
	});
	
});

//Return a station
router.get('/stations/:station_id', function (req, res) {
	
	console.log("Returning a Station...");
	
	Station.findById(req.params.station_id, function(err, station){
		
		if(err) throw err;
		console.log("Returning the Station...");
		res.json(station);
		
	});
	
});

//Modify a station
router.put('/stations/:station_id', function (req, res) {
	
	console.log("Updating a Station...");
	Station.findById(req.params.station_id, function(err, station){
		
		if(err) throw err;
		
		station.mac = req.body.mac;
		station.localizacion = req.body.localizacion;
		station.propietario = req.body.propietario;
		
		station.save(function (err) {
		
			if (err) throw err;
			console.log('Station updated!');
			res.json({ success: true });	
			
		});
		
	});
	
});

//Delete a station
router.delete('/stations/:station_id', function (req, res) {
	
	console.log("Deleting a Station...");
	
	Station.remove({
            _id: req.params.station_id
        }, function(err, station) {
			
			if(err) throw err;
			res.json({ success: true });
		
	});	
	
});

module.exports = router;