var SU = require('../models/alumnos');
var SU2 = require('../models/alumnos2');
var SU3 = require('../models/alumnos3');
var SU4 = require('../models/alumnos4');

var crypto = require('crypto');
var key = 'lab3';

module.exports = function(app){
	
	app.get('/', function(req, res){
		//SU.list(function(e, subs){
			res.render('index', { title: 'Lista de suscriptores',error:'' });
		//})
		
	})
	
	app.post('/', function(req, res){
		console.log(req.param('name'));
		var hash = crypto.createHmac('sha512',key);
		hash.update(req.param('name'));
		var value = hash.digest('hex');
		console.log(value);
		console.log((parseInt(value,16))%3);
		var bd = parseInt(value,16)%3;
		if(bd==0){
			SU.new({name: req.param('name'), email: req.param('email')}, function(o){
				//SU.list(function(e, subs){
					res.render('index', { title: 'Lista de suscriptores', error:o});
				//})
			})
		}
		else if(bd==1){
			SU2.new({name: req.param('name'), email: req.param('email')}, function(o){
				//SU.list(function(e, subs){
					res.render('index', { title: 'Lista de suscriptores', error:o});
				//})
			})
		}
		else if(bd==2){
			SU3.new({name: req.param('name'), email: req.param('email')}, function(o){
				//SU.list(function(e, subs){
					res.render('index', { title: 'Lista de suscriptores', error:o});
				//})
			})
		}
		else if(bd==3){
			SU4.new({name: req.param('name'), email: req.param('email')}, function(o){
				//SU.list(function(e, subs){
					res.render('index', { title: 'Lista de suscriptores', error:o});
				//})
			})
		}
		
	})
	
}