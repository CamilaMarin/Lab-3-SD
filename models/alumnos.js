var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dPort1 = 3000;
var dPort2 = 26999;
var dHost = "localhost";
var dName = "aplicaciónBD";

var DB1 = {};
var DB2 = {};
var DB3 = {};

DB1.db = new Db(dName, new Server(dHost, dPort1, {auto_reconnect: true},{}));
DB1.db.open(function(e,d){
	if(e){
		console.log(e)
	}else{
		console.log("Conectado a la base de datos en puerto: 3000");
	}
});

DB2.db = new Db(dName, new Server(dHost, dPort2, {auto_reconnect: true},{}));
DB2.db.open(function(e,d){
	if(e){
		console.log(e)
	}else{
		console.log("Conectado a la base de datos en puerto: 26999");
	}
});

DB1.alumnos = DB1.db.collection('alumnos');
DB2.alumnos = DB2.db.collection('alumnos');

module.exports = DB1;
module.exports = DB2;

DB1.new1 = function(newData, callback){
	DB1.alumnos.findOne({email: newData.email}, function(e,obj){
		if(obj){
			callback('Ese email ya existe.');
		}else{
			DB1.alumnos.insert(newData, callback(null))
		}
	})
}

DB2.new2 = function(newData, callback){
	DB2.alumnos.findOne({email: newData.email}, function(e,obj){
		if(obj){
			callback('Ese email ya existe.');
		}else{
			DB2.alumnos.insert(newData, callback(null))
		}
	})
}

DB1.list = function(callback){
	DB1.alumnos.find().toArray(function(e,res){
		if(e){
			callback(e)
		}else{
			callback(null, res)
		}
	})
}

DB1.edit = function(newData, callback){
	DB1.alumnos.findOne({_id: this.getObjectId(newData.id)}, function(e,o){
		o.name = newData.name;
		o.email = newData.email;
		DB1.alumnos.save(o);
		callback(o);
	})
}

DB1.delete = function(id, callback){
	DB1.alumnos.remove({_id: this.getObjectId(id)},callback)
}


DB1.getObjectId = function(id){
	return DB1.alumnos.db.bson_serializer.ObjectID.createFromHexString(id)
}




