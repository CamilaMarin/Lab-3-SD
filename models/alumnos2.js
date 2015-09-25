var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dPort2 = 26999;
var dHost = "localhost";
var dName = "aplicaciónBD";

var DB2 = {};

DB2.db = new Db(dName, new Server(dHost, dPort2, {auto_reconnect: true},{}));
DB2.db.open(function(e,d){
	if(e){
		console.log(e)
	}else{
		console.log("Conectado a la base de datos en puerto: 26999");
	}
});

DB2.alumnos = DB2.db.collection('alumnos');

module.exports = DB2;

DB2.new = function(newData, callback){
	DB2.alumnos.findOne({email: newData.email}, function(e,obj){
		if(obj){
			callback('Ese email ya existe.');
		}else{
			DB2.alumnos.insert(newData, callback(null))
		}
	})
}
