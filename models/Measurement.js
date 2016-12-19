var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Measurement = new Schema({
	mac : String,
	date : Date,
	current: Boolean,
	ldr: {
	    lightValue: Number,
	    lightState: Boolean,
	    working: Boolean
	},
	bmp180: {
	    temperature: Number,
	    pressure: Number,
		height: Number,
		working: Boolean
	},
	yl83: {
	    rainValue: Number,
	    rainState: Boolean,
	    working: Boolean
	},
	dht: {
	    humedity: Number,
	    temperature: Number,
	    working: Boolean
	}
});


var Measurement = mongoose.model('Measurement', Measurement); 
module.exports = Measurement;