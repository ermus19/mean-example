var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Station = new Schema({
	mac: String,
	localization: String,
	owner: String,
	created_date: Date,
	updated_date: Date
});

Station.pre('save', function(next) {
	
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_date = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_date)
    this.created_at = currentDate;

  next();
});

var Station = mongoose.model('Station', Station); 
module.exports = Station;