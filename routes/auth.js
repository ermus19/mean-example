var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router({mergeParams: true});
var User = require("../models/User");

router.post('/login' , function(req, res){
	
	User.findOne({$or: [
		
		{username: req.body.username},
		{email: req.body.email.toLowerCase()}
		
	]}, function(err, user){
		
		if(err) throw err;
		
		if(!user){
			
			res.json({ success: false, message: 'Authentication failed. User not found.' });
			
		} else if (user) {
		
			user.comparePassword(req.body.password, function(err, isMatch) {
            	if (err) throw err;

				if (!isMatch) {
			
        			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				
				} else {

					var token = jwt.sign(user, req.app.get('secretToken'), {
          			expiresIn: 60*60*24 
        		});

				res.json({
          			success: true,
          			message: 'Enjoy your token!',
          			token: token
        		});
			} 
				
				
			});
			  
		}
		
	});
	
});

router.post('/register', function(req, res){
	
	console.log("Creating new User...");
	
	User.findOne({
		username: req.body.username,
	}, function(user, err){
		if(err) throw err;
		
		if(!user){
			
			var user = new User();
	
			user.username = req.body.username;
			user.password = req.body.password;
			user.email = req.body.email.toLowerCase();
			user.admin = false;

			user.save(function (err) {

				if (err) throw err;
				console.log('User created!');
				res.json({ success: true});

			});
			
		} else if (user){
			
			console.log("Username already taken. Pick another.");
			res.json({ success: false, message: "username already taken"});
			
		}

	});
	
});



module.exports = router;