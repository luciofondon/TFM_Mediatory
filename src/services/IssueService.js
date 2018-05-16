
var httpService = require('./HttpService'),
appManagement = require('../../config/AppManagement');

var request = require("request");

exports.createIssues = function(req, res) {
	createIssues(req, res);
};

exports.readAllIssues = function(req, res) {
    readAllIssues(req, res);
};

function readAllIssues(req, res){
	let configServer = req.body
	let configApp = {};
	appManagement.apps.forEach(function(app){
		if(app.id == configServer.app){
			configApp = app;
		}
	});

	let ip = configServer.ip + ":" + configServer.port;
	let token = configServer.token;
	let projectId = configServer.project;
	var options = { method: configApp.api.getIssues.method,
	 	 url: 'http://' + ip + configApp.api.getIssues.url + projectId,
	 	 headers: {
			'content-type': 'application/json'
		}
	};
	options.headers[configApp.authentication.headerKey] = token;

	request(options, function (error, response, body) {
		if (error)
			res.status(500).json({error: "No se ha podido realizar la petición"});
		else if(response.statusCode >= 400 && response.statusCode <= 500){
			res.status(response.statusCode).json({error: body.errors != undefined ? body.errors[0] : "Error en la conexion"});
		}else{
			let format = configApp.api.getIssues.formatResponse(JSON.parse(body));
			res.status(response.statusCode).json(format);
		}
	});
}


function createIssues(req, res){
	let serverTaskManager = req.body.config;
	let issues = req.body.issues;
	let configApp = {};

	appManagement.apps.forEach(function(app){
		if(app.id == serverTaskManager.app){
			configApp = app;
		}
	});
	let ip = serverTaskManager.ip + ":" + serverTaskManager.port;
	let token = serverTaskManager.token;
	issues.forEach(function(issue){
		var options = {
			method: configApp.api.createIssue.method,
			 url: 'http://' + ip + configApp.api.createIssue.url,
			headers: {
				'content-type': 'application/json'
			},
			json: configApp.api.createIssue.format(issue, serverTaskManager.project)
		};
		console.log("verrrr")
		console.log(configApp.api.createIssue.format(issue, serverTaskManager.project))
		options.headers[configApp.authentication.headerKey] = token;

		request(options, function (error, response, body) {
			console.log(error)
			console.log(body)

			/*if (error)
				res.status(500).json({error: "No se ha podido realizar la petición"});
			else if(response.statusCode >= 400 && response.statusCode <= 500){
				res.status(response.statusCode).json({error: body.errors[0]});
			}else{
				res.status(response.statusCode).json(configApp.api.addProject.formatResponse(body));
			}*/
		});
	})

	res.status(200).json({info: "Incidencias exportadas correctamente"});

}
