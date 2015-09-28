var AUX = require('../models/alumnos');
var AUX2 = require('../models/alumnos2');
var AUX3 = require('../models/alumnos3');
var AUX4 = require('../models/alumnos4');

var crypto = require('crypto');
var key = 'lab3';

module.exports = function(app){
	
	app.get('/', function(req, res){
			res.render('index', { title: 'Ingresar alumnos',error:'' });
	})
	
	app.post('/', function(req, res){
		console.log(req.param('rut'));
		var hash = crypto.createHmac('sha512',key);
		hash.update(req.param('rut'));
		var value = hash.digest('hex');
		console.log(value);
		console.log((parseInt(value,16))%3);
		var bd = parseInt(value,16)%3;
		if(bd==0){
			AUX.new({name: req.param('name'), apellido: req.param('apellido'), carrera: req.param('carrera'), rut: req.param('rut')}, function(o){
					res.render('index', { title: 'Ingresar alumnos', error: 'Alumno ingresado correctamente'});
			})
		}
		else if(bd==1){
			AUX2.new({name: req.param('name'), apellido: req.param('apellido'), carrera: req.param('carrera'), rut: req.param('rut')}, function(o){
					res.render('index', { title: 'Ingresar alumnos', error: 'Alumno ingresado correctamente'});
			})
		}
		else if(bd==2){
			AUX3.new({name: req.param('name'), apellido: req.param('apellido'), carrera: req.param('carrera'), rut: req.param('rut')}, function(o){
					res.render('index', { title: 'Ingresar alumnos', error: 'Alumno ingresado correctamente'});
			})
		}
		else if(bd==3){
			AUX4.new({name: req.param('name'), apellido: req.param('apellido'), carrera: req.param('carrera'), rut: req.param('rut')}, function(o){
					res.render('index', { title: 'Ingresar alumnos', error: 'Alumno ingresado correctamente'});
			})
		}
		
	})

	app.get('/buscar', function(req, res){
		res.render('buscar', { title: 'Buscar alumnos', alumnos: '' });
	})

	app.post('/buscar',function(req, res){
		var resultado = [];
		var i;
		AUX.list({filtro: req.param('filtro')}, function(e, alumnos){
			console.log('Buscando en base de datos en puerto 3000');
			for (i = 0; i < alumnos.length; i++) {
				resultado.push(alumnos[i]);
			}
			AUX2.list({filtro: req.param('filtro')}, function(e, alumnos2){
				console.log('Buscando en base de datos en puerto 26999');
				for (i = 0; i < alumnos2.length; i++) {
					resultado.push(alumnos2[i]);
				}
				AUX3.list({filtro: req.param('filtro')}, function(e, alumnos3){
					console.log('Buscando en base de datos en puerto 1515');
					for (i = 0; i < alumnos3.length; i++) {
						resultado.push(alumnos3[i]);
					}
					AUX4.list({filtro: req.param('filtro')}, function(e, alumnos4){
						console.log('Buscando en base de datos en puerto 8080');
						for (i = 0; i < alumnos4.length; i++) {
							resultado.push(alumnos4[i]);
						}
						res.render('buscar', { title: 'Buscar alumnos',error:'', alumnos: resultado.sort() });
					})
				})
			})
		})
	})
	
}