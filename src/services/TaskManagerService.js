
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Servicio de configuracion con las API de terceros
 */

var Promise = require('promise');

var httpService = require('../services/HttpService'),
	appManagement = require('../../config/AppManagement');

module.exports = {
	
	/**
	 * @param  {} config Configuracion del servidor con el que se va a intentar conectar
	 * @description Comprueba que la comunicacion es satisfactoria con el servidor
	 */
	checkComunication = function(config) {
		return checkComunication(config);
	},
	
	/**
	 * @description Devuelve la configuracion de todas las aplicationes de terceros disponibles
	 */
	getApps: function() {
		return getApps();
	}
}

function getApps(){
	let promise = new Promise(function(resolve, reject){
		let response = [];
		appManagement.apps.forEach(function(app){
			let item = {};
			item.id = app.id;
			item.name = app.name;
			item.logo = app.logo;
			item.authentication = app.authentication.params;
			response.push(item);
		});
		console.log("getApps")
		console.log(response)
		resolve({code: 200, data: response});
	});
	return promise;
}

function checkComunication(config){
	let promise = new Promise(function(resolve, reject){
		let configApp = {};
		appManagement.apps.forEach(function(app){
			if(app.id == configServer.app){
				configApp = app;
			}
		});

		let ip = config.ip + ":" + config.port;
		let header = {
			'content-type': 'application/json'
		};
		header[configApp.authentication.headerKey] = token;

		httpService.get(ip, header, configApp.api.getProjects.url).then(function(error, response, body){
			reject({code: 200, data: "Se ha establecido la conexión correctamente"})
		}).catch(function(error, response, body){
			reject({code: 500, error: "No se ha establecido la conexión correctamente"})
		});
	});
	return promise;
}


		/*
		
				//let configServer = req.body
let ip = configServer.ip + ":" + configServer.port;
		let token = configServer.token;

		var options = {
			method: configApp.api.getProjects.method,
			url: 'http://' + ip + configApp.api.getProjects.url,
			headers: {
				'content-type': 'application/json'
			},
		};
		options.headers[configApp.authentication.headerKey] = token;
*/
/*
request(options, function (error, response, body) {

	if (error)
		res.status(500).json({error: "No se ha podido realizar la petición"});
	else if(response.statusCode >= 400 && response.statusCode <= 500){
		res.status(response.statusCode).json({error: body.errors[0]});
	}else{
		res.status(response.statusCode).json(body);
	}

	if(error || (response.statusCode >= 400 && response.statusCode <= 500))
		res.status(500).json({error: "No se ha establecido la conexión correctamente"});
	else
		res.json({status: "Se ha podido establecer la conexión"});
});*/
