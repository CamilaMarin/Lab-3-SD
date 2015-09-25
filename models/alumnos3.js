var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dPort3 = 1515;
var dHost = "localhost";
var dName = "aplicaciónBD";

var DB3 = {};

DB3.db = new Db(dName, new Server(dHost, dPort3, {auto_reconnect: true},{}));
DB3.db.open(function(e,d){
	if(e){
		console.log(e)
	}else{
		console.log("Conectado a la base de datos en puerto: 1515");
	}
});

DB3.alumnos = DB3.db.collection('alumnos');

module.exports = DB3;

DB3.new = function(newData, callback){
	DB3.alumnos.findOne({email: newData.email}, function(e,obj){
		if(obj){
			callback('Ese email ya existe.');
		}else{
			DB3.alumnos.insert(newData, callback(null))
		}
	})
}
