

var Promise = require('promise');

var httpService = require('./HttpService'),
	appManagement = require('../../config/AppManagement');


module.exports = {

	createIssues: function(config, project) {
		return createIssues(config, project);
	},

	readAllIssues: function(config, issues) {
		return readAllIssues(config, issues);
	}
}

function readAllIssues(config){
	let promise = new Promise(function(resolve, reject){
		let configApp = {};
		appManagement.apps.forEach(function(app){
			if(app.id == config.app){
				configApp = app;
			}
		});

		let ip = config.ip + ":" + config.port;
		let header = {
			'content-type': 'application/json'
		};
		header[configApp.authentication.headerKey] = config.token;

		httpService.get(ip, header, configApp.api.getIssues.url + config.project).then(function(data){
			let format = configApp.api.getIssues.formatResponse(JSON.parse(data.body));
			resolve({code: data.response.statusCode, data: format});
		}).catch(function(data){
			if (error)
				reject({code: data.response.statusCode, error: "No se ha podido realizar la petición"})
			else if(data.response.statusCode >= 400 && data.response.statusCode <= 500){
				reject({code: response.statusCode, error: data.body.errors[0]})
			}else{
				reject({code: 500, error: "No se ha podido realizar la petición"})
			}
		});

	});
	return promise;
}
/*

let ip = config.ip + ":" + config.port;
		let token = config.token;
		let projectId = config.project;

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
		*/


function createIssues(config, issues){
	let promise = new Promise(function(resolve, reject){
		console.log("entra")
		let configApp = {};
		appManagement.apps.forEach(function(app){
			if(app.id == config.app){
				configApp = app;
			}
		});

		let ip = config.ip + ":" + config.port;
		let header = {
			'content-type': 'application/json'
		};
		header[configApp.authentication.headerKey] = config.token;

		issues.forEach(function(issue){
			let body = configApp.api.createIssue.formatRequest(issue, config.project);
			httpService.post(ip, header, configApp.api.createIssue.url, body).then(function(error, response, body){
				console.log("Una exportada")
			}).catch(function(error, response, body){
				console.log("Una exportada con error")
			});
		});

		resolve({data: "Incidencias exportadas correctamente"});
	});
	return promise;

}
/*
request(options, function (error, response, body) {
	console.log(error)
	console.log(body)

	if (error)
		res.status(500).json({error: "No se ha podido realizar la petición"});
	else if(response.statusCode >= 400 && response.statusCode <= 500){
		res.status(response.statusCode).json({error: body.errors[0]});
	}else{
		res.status(response.statusCode).json(configApp.api.addProject.formatResponse(body));
	}
});*/
