var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;


var User = new Schema({
	username : String,
	password : String,
	email: String,
	admin: Boolean
});

User.pre('save', function(next){
	
    var user = this;
	
    if (!user.isModified('password')) return next();
	
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		
		if(err) throw err;
		
    	bcrypt.hash(user.password, salt, function(err, hash) {
        
			if(err) throw err;
			user.password = hash;
			next();
			
		});
		
	});
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var User = mongoose.model('User', User); 
module.exports = User;