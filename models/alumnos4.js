var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dPort4 = 8080;
var dHost = "localhost";
var dName = "aplicaciónBD";

var DB4 = {};

DB4.db = new Db(dName, new Server(dHost, dPort4, {auto_reconnect: true},{}));
DB4.db.open(function(e,d){
	if(e){
		console.log(e)
	}else{
		console.log("Conectado a la base de datos en puerto: 8080");
	}
});

DB4.alumnos = DB4.db.collection('alumnos');

module.exports = DB4;

DB4.new = function(newData, callback){
	DB4.alumnos.findOne({email: newData.email}, function(e,obj){
		if(obj){
			callback('Ese email ya existe.');
		}else{
			DB4.alumnos.insert(newData, callback(null))
		}
	})
}
