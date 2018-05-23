var httpService = require('../services/HttpService'),
	appManagement = require('../../config/AppManagement');

var request = require("request");

exports.checkComunication = function(req, res) {
    checkComunication(req, res);
};

exports.getApps = function(req, res) {
    getApps(req, res);
};

function getApps(req, res){
	console.log("entra")
	let response = [];
	appManagement.apps.forEach(function(app){
		let item = {};
		item.id = app.id;
		item.name = app.name;
		item.logo = app.logo;
		item.authentication = app.authentication.params;
		response.push(item);
	});
	console.log("Devolviendo")
	res.json(response);
}


function checkComunication(req, res){
	let configServer = req.body
	let configApp = {};
	appManagement.apps.forEach(function(app){
		if(app.id == configServer.app){
			configApp = app;
		}
	});

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

	request(options, function (error, response, body) {

		/*if (error)
			res.status(500).json({error: "No se ha podido realizar la petición"});
		else if(response.statusCode >= 400 && response.statusCode <= 500){
			res.status(response.statusCode).json({error: body.errors[0]});
		}else{
			res.status(response.statusCode).json(body);
		}*/

		if(error || (response.statusCode >= 400 && response.statusCode <= 500))
			res.status(500).json({error: "No se ha establecido la conexión correctamente"});
		else
			res.json({status: "Se ha podido establecer la conexión"});
	});


}
