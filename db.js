var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var clog = require("clog");
require('date-utils');

clog.configure({"log level": 3});
//{'log': true, 'info': true, 'warn': true, 'error': true, 'debug': true}

MongoClient.connect('mongodb://localhost:27017/devices', function(err, dmsDB){
	if(err){
		clog.error("DB Connection Fail."+err);
	}else{
		clog.info("DB Connection Success.");
		db = dmsDB;

		db.createCollection("devices", function(err, device){
			db.device = device;
			deviceId = [];
			userId = [];
			date = [];
			var now = new Date();
			for(var i=0; i<10; i++){
				deviceId[i] = new ObjectId();
				userId[i] = new ObjectId();
				date[i] = new Date(now*1-(1000*60*60*24*(i+1)*10));
				date[i] = date[i].toFormat('YYYY-MM-DD HH24:MI:SS');
			}
			var devices = [{
												_id: deviceId[0],
												deviceNo: "B123456",
												name: "갤럭시S3",
												os: "Android 4.3",
												maker: "SAMSUNG",
												regDate: date[0],
												user: [{
														_id: userId[0],
														password: "qwerty",
														userNo: "nt11111",
														username: "홍길동",
														workplace: "Gasan"
												}],
												usim : "false",
												deviceName: "SV-E300",
												qr_img: "img",
												rent : "0"
										 },
										 {
											 _id: deviceId[1],
											 deviceNo: "C234567",
											 name: "갤럭시S4",
											 os: "Android 4.4.2",
											 maker: "SAMSUNG",
											 regDate: date[1],
											 user : [{
												 	  _id: userId[1],
													  password: "qwerty1",
													  userNo: "nt12344",
													  username: "김철수",
													  workplace: "Gasan"
											 }],
											 usim : "false",
											 deviceName: "SV-ES521",
											 qr_img: "img",
											 rent : "1"
										 },
										 {
											 _id: deviceId[2],
											 deviceNo: "D345678",
											 name: "베가 아이언",
											 os: "Android 5.0.1",
											 maker: "SKY",
											 regDate: date[2],
											 user : [{
												 		_id: userId[2],
														password: "qwerty2",
														userNo: "nt12233",
														username: "전우치",
														workplace: "Seohyun"
											}],
											 usim : "true",
											 deviceName: "VEGA-1023",
											 qr_img: "img",
											 rent : "1"
										 },
										 {
											 _id: deviceId[3],
											 deviceNo: "E019232",
											 name: "갤록시S7",
											 os: "Android 7.0",
											 maker: "SAMSUNG",
											 regDate: date[3],
											 user : [{
												 		_id: userId[3],
														password: "qwerty3",
														userNo: "nt54321",
														username: "박",
														workplace: "Jungja"
											 }],
											 usim : "false",
											 deviceName: "SV-EX403",
											 qr_img: "img",
											 rent : "1"
										 },
										 {
											 _id: deviceId[4],
											 deviceNo: "F654123",
											 name: "엑스페리아",
											 os: "Android 6.0.1",
											 maker: "SONY",
											 regDate: date[4],
											 user : [{
												 		_id: userId[4],
														password: "qwerty4",
														userNo: "nt12345",
														username: "김핵잼",
														workplace: "Seohyun"
											 }],
											 usim : "false",
											 deviceName: "SONY-ITSWONDERFULL",
											 qr_img: "img",
											 rent : "2"
										 },
										 {
											 _id: deviceId[5],
											 deviceNo: "G372615",
											 name: "갤럭시S7 edge",
											 os: "Android 5.1.2",
											 maker: "SAMSUNG",
											 regDate: date[5],
											 user : [{
												 		_id: userId[5],
														password: "qwerty5",
														userNo: "nt12346",
														username: "최핵점",
														workplace: "Jungja"
											 }],
											 usim : "false",
											 deviceName: "SV-E52F1",
											 qr_img: "img",
											 rent : "2"
										 },
										 {
											 _id: deviceId[6],
											 deviceNo: "H293842",
											 name: "갤럭시 노트5",
											 os: "Android 6.1",
											 maker: "SAMSUNG",
											 regDate: date[6],
											 user : [{
												 		_id: userId[1],
														password: "qwerty1",
														userNo: "nt15674",
														username: "김선달",
														workplace: "Gasan"
											 }],
											 usim : "true",
											 deviceName: "SV-pre123",
											 qr_img: "img",
											 rent : "2"
										 },
									     {
											 _id: deviceId[7],
											 deviceNo: "I324159",
											 name: "아이폰 6S plus",
											 os: "iOS 9.3.1",
											 maker: "Apple",
											 regDate: date[7],
											 user : [{
												 		_id: userId[0],
														password: "qwerty",
														userNo: "nt55554",
														username: "앱등이",
														workplace: "Gasan"
											 }],
											 usim : "true",
											 deviceName: "iPhone-6sp14",
											 qr_img: "img",
											 rent : "0"
										 },
										 {
											 _id: deviceId[8],
											 deviceNo: "J479864",
											 name: "아이폰 7",
											 os: "iOS 10.3",
											 maker: "Apple",
											 regDate: date[8],
											 user : [{
												 		_id: userId[0],
														password: "qwerty",
														userNo: "nt11253",
														username: "유경현",
														workplace: "Gasan"
											 }],
											 usim : "true",
											 deviceName: "iPhone-7kk",
											 qr_img: "img",
											 rent : "0"
										 },
										 {
											 _id: deviceId[9],
											 deviceNo: "K198812",
											 name: "LG G6",
											 os: "Android 7.0.1",
											 maker: "LG",
											 regDate: date[9],
											 user : [{
_id: userId[0],
	 password: "qwerty",
	 userNo: "nt11253",
	 username: "유경현",
	 workplace: "Gasan"
											 }],
											 usim : "true",
											 deviceName: "g6-1234",
											 qr_img: "img",
											 rent : "1"
										 }

									 ];
			db.device.insert(devices, findDevice);
		});
	}
});

function findDevice(){
	db.device.find({}, {_id: 0, name: 1, regDate: 1}).toArray(function(err, result){
		clog.info(result);
		clog.info("Length is : " + result.length);
	});
}
