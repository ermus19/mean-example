var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Measurement = require("../models/Measurement");


//Return all measurements
router.get('/measurements', function (req, res){
	
	console.log("Sending all Measurements...");
	
	Measurement.find({}, function(err, measurements){
		
		if(err) throw err;
		console.log(measurements);
		res.json(measurements);
		console.log("All Measurements sent!");
		
	});
	
});

//Create a measurement
router.post('/measurements', function(req, res){
	
	Measurement.update({
		
		mac: req.body.mac,
		actual: true
		
	}, {
		
		actual: false
		
	}, function (err){
		
		if(err) throw err;
	
	});
	
	console.log("Creating new Measurement...");
	var measurement = new Measurement();
	
	measurement.mac = req.body.mac;
	measurement.date = new Date();
	measurement.current= req.body.current;
	
	measurement.ldr.lightValue = req.body.ldr.lightValue;
	measurement.ldr.lightState = req.body.ldr.lightState;
	measurement.ldr.working = req.body.ldr.working;
	
	measurement.bmp180.temperature = req.body.bmp180.temperature;
	measurement.bmp180.pressure = req.body.bmp180.pressure;
	measurement.bmp180.height = req.body.bmp180.height;
	measurement.bmp180.working = req.body.bmp180.working;
	
	measurement.yl83.rainValue = req.body.yl83.rainValue;
	measurement.yl83.rainState = req.body.yl83.rainState;
	measurement.yl83.working = req.body.yl83.working;
	
	measurement.dht.humedity = req.body.dht.humedity;
	measurement.dht.temperature = req.body.dht.temperature;
	measurement.dht.working = req.body.dht.working;
	
	measurement.save(function(err){
		
		if(err) throw err;
		console.log("Measurement created!");
		res.json({ success: true });		
	})
	
});

//Return a measurement
router.get('/measurements/:measurement_id', function(req, res){
	
	console.log("Returning a Measurement...");
	
	Measurement.findById(req.params.measurement_id, function(err, measurement){
		
		if(err) throw err;
		console.log("Returning the Measurement...");
		res.json(measurement);
		
	});
	
});

//Modify a measurement
router.put('/measurements/:measurement_id', function(req, res){
	
	console.log("Updating a Measurement...");
	Measurement.findById(req.params.measurement_id, function(err, measurement){
		
		if(err) throw err;
		
		measurement.mac = req.body.mac;
		measurement.date = new Date();
		measurement.current= req.body.current;

		measurement.ldr.lightValue = req.body.ldr.lightValue;
		measurement.ldr.lightState = req.body.ldr.lightState;
		measurement.ldr.working = req.body.ldr.working;

		measurement.bmp180.temperature = req.body.bmp180.temperature;
		measurement.bmp180.pressure = req.body.bmp180.pressure;
		measurement.bmp180.height = req.body.bmp180.height;
		measurement.bmp180.working = req.body.bmp180.working;

		measurement.yl83.rainValue = req.body.yl83.rainValue;
		measurement.yl83.rainState = req.body.yl83.rainState;
		measurement.yl83.working = req.body.yl83.working;

		measurement.dht.humedity = req.body.dht.humedity;
		measurement.dht.temperature = req.body.dht.temperature;
		measurement.dht.working = req.body.dht.working;
		
		measurement.save(function (err) {
		
			if (err) throw err;
			console.log('Measurement updated!');
			res.json({ success: true });		
		});
		
	});
	
});

//Delete a measurement
router.delete('/measurements/:measurement_id', function(req, res){
	
	console.log("Deleting a Measurement...");
	
	Measurement.remove({
            _id: req.params.measurement_id
        }, function(err, measurement) {
			
			if(err) throw err;
			res.json({ success: true });
		
	});	
	
});

module.exports = router;