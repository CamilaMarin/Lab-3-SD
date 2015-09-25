var SU = require('../models/alumnos') 

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
		SU.new2({name: req.param('name'), email: req.param('email')}, function(o){
			//SU.list(function(e, subs){
				res.render('index', { title: 'Lista de suscriptores', error:o});
			//})
		})
	})
	
	app.post('/save', function(req,res){
		SU.edit({name: req.param('name'), email:req.param('email'), id:req.param('id')}, function(o){
			if(o){
				res.redirect('/');
			}else{
				resp.send('Error al actualiza registro',400)
			}
		})
	})
	
	app.post('/delete', function(req, res){
		SU.delete(req.body.id, function(e,obj){
			if(!e){
				res.send('ok',200)
			}else{
				res.send('El subscriptor a eliminar no existe', 400)
			}
			
		})
	})
	
}