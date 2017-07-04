var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	_id: "ObjectId",
	deviceNo: "String",
	name: "String",
	os: "String",
	maker: "String",
	regDate: "String",
	user : [{
		_id: "ObjectId",
		password: "String",
		userNo: "String",
		username: "String",
		workplace: "String"
	}],
	usim : "Boolean",
	deviceName: "String",
	qr_img: "String",
	rent : "Number"
});

module.exports = mongoose.model('device', deviceSchema);
