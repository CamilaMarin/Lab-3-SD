var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dPort1 = 3000;
var dHost = "localhost";
var dName = "aplicaciónBD";

var DB1 = {};

DB1.db = new Db(dName, new Server(dHost, dPort1, {auto_reconnect: true},{}));
DB1.db.open(function(e,d){
	if(e){
		console.log(e)
	}else{
		console.log("Conectado a la base de datos en puerto: 3000");
	}
});

DB1.alumnos = DB1.db.collection('alumnos');

module.exports = DB1;

DB1.new = function(newData, callback){
	DB1.alumnos.findOne({email: newData.email}, function(e,obj){
		if(obj){
			callback('Ese email ya existe.');
		}else{
			DB1.alumnos.insert(newData, callback(null))
		}
	})
}
