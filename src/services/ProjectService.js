
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Servicio para la comunicacion de proyectos con las API's de terceros
 */

var Promise = require('promise');

var httpService = require('./HttpService'),
	appManagement = require('../../config/AppManagement');


module.exports = {
	/**
	 * @param  {} config Configuracion del servidor con el que se va a intentar conectar
	 * @param  {} project Parametros del proyeto que se desea crear
	 * @description Crea un proyecto en Jira/redmine...
	 */
	createProject = function(config, project) {
		return createProject(config, project);
	},
	/**
	 * @param  {} config Configuracion del servidor con el que se va a intentar conectar
	 * @description Lee todos los proyectos creados en Jira/redmine..
	 */
	readAllProject: function(config) {
		return readAllProject(config);
	}
}

function createProject(config, project){
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

	let body = configApp.api.addProject.formatRequest(project.name, project.key, project.description);

	httpService.post(ip, header, configApp.api.createProject.url, body).then(function(error, response, body){
		let format = configApp.api.getProjects.formatResponse(JSON.parse(body));
		resolve({code: response.statusCode, data: format})
	}).catch(function(error, response, body){
		if (error)
			reject({code: response.statusCode, error: "No se ha podido realizar la petición"})
		else if(response.statusCode >= 400 && response.statusCode <= 500){
			reject({code: response.statusCode, error: body.errors[0]})
		}else{
			reject({code: 500, error: "No se ha podido realizar la petición"})
		}
	});
}

function readAllProject(config){
	let promise = new Promise(function(resolve, reject){
		let configApp = {};
		appManagement.apps.forEach(function(app){
			if(app.id == config.app){
				configApp = app;
			}
		});

		let ip = config.ip + ":" + config.port;
		let token = config.token;
		let header = {
			'content-type': 'application/json'
		};
		header[configApp.authentication.headerKey] = token;

		httpService.get(ip, configApp.api.getProjects.url).then(function(error, response, body){
			console.log("readAllProject")
			console.log(JSON.parse(body))
			let format = configApp.api.getProjects.formatResponse(JSON.parse(body));
			resolve({code: response.statusCode, data: format})
		}).catch(function(error, response, body){
			if (error)
				reject({code: response.statusCode, error: "No se ha podido realizar la petición"})
			else if(response.statusCode >= 400 && response.statusCode <= 500){
				reject({code: response.statusCode, error: body.errors[0]})
			}else{
				reject({code: 500, error: "No se ha podido realizar la petición"})
			}
		});
	});
	return promise;
}

//let token = 'f5785d571a9266a99d5624f2db99e914c7dda844';
//let ip = "158.49.112.112";
/*
function createProject(req, res){
	let serverTaskManager = req.body.config;
	let project = req.body.project;
	let configApp = {};

	appManagement.apps.forEach(function(app){
		if(app.id == serverTaskManager.app){
			configApp = app;
		}
	});
	let ip = serverTaskManager.ip + ":" + serverTaskManager.port;
	let token = serverTaskManager.token;

	var options = {
		method: configApp.api.addProject.method,
	 	url: 'http://' + ip + configApp.api.addProject.url,
		headers: {
			'content-type': 'application/json'
		},
		json: configApp.api.addProject.formatRequest(project.name, project.key, project.description)
	};
	options.headers[configApp.authentication.headerKey] = token;

	request(options, function (error, response, body) {
		console.log(error)
		console.log(response)
		console.log(body)

		if (error)
			res.status(500).json({error: "No se ha podido realizar la petición"});
		else if(response.statusCode >= 400 && response.statusCode <= 500){
			res.status(response.statusCode).json({error: body != undefined ? body.errors[0]:  "No se ha podido realizar la petición"});
		}else{
			res.status(response.statusCode).json(configApp.api.addProject.formatResponse(body));
		}
	});
}

function readAllProject(req, res){
	let configServer = req.body
	let configApp = {};
	appManagement.apps.forEach(function(app){
		if(app.id == configServer.app){
			configApp = app;
		}
	});

	let ip = configServer.ip + ":" + configServer.port;
	let token = configServer.token;

	var options = { method: configApp.api.getProjects.method,
	 	 url: 'http://' + ip + configApp.api.getProjects.url,
	 	 headers: {
			'content-type': 'application/json'
		}
	};
	options.headers[configApp.authentication.headerKey] = token;

	request(options, function (error, response, body) {
		if (error)
			res.status(500).json({error: "No se ha podido realizar la petición"});
		else if(response.statusCode >= 400 && response.statusCode <= 500){
			res.status(response.statusCode).json({error: body.errors[0]});
		}else{
			let format = configApp.api.getProjects.formatResponse(JSON.parse(body));
			res.status(response.statusCode).json(format);
		}
	});
}
*/

/*

function createProject2(req, res){
    let header = {};
    let body = {};
    if(req.params.app == "jira"){
        header = {
            authorization: 'Basic ' +  base64.encode(utf8.encode(req.body.user +  ":" +  req.body.password)),
           'content-type': 'application/json'
        };

        body = {
            "key": req.body.key,
            "name": req.body.name,
            "projectTypeKey": "business",
            "projectTemplateKey": "com.atlassian.jira-core-project-templates:jira-core-project-management",
            "description": req.body.description,
            "lead": "lfondont",
            "url": "http://atlassian.com",
            "assigneeType": "PROJECT_LEAD",
            "avatarId": 10200
        }
        httpService.post(req.body.ip, req.body.port, config.URL_JIRA_PROJECT, header, body, res);
    }else if(req.params.app == "redmine"){
        header = {
            'x-redmine-api-key': req.body.token,
            'content-type': 'application/json'
        };

        body = {
            "project": {
                "name": req.body.name,
                "identifier": req.body.key,
                "description": req.body.description,
                "homepage": "",
                "status": 1,
                "is_public": true
            }
        }
        httpService.post(req.body.ip, req.body.port, config.URL_REDMINE_PROJECT, header, body, res);
    }
}
*/




		/*var options = {
		method: configApp.api.addProject.method,
	 	url: 'http://' + ip + configApp.api.addProject.url,
		headers: {
			'content-type': 'application/json'
		},
		json: configApp.api.addProject.formatRequest(project.name, project.key, project.description)
	};
	options.headers[configApp.authentication.headerKey] = token;*/

	/*
	request(options, function (error, response, body) {
		if (error)
			res.status(500).json({error: "No se ha podido realizar la petición"});
		else if(response.statusCode >= 400 && response.statusCode <= 500){
			res.status(response.statusCode).json({error: body.errors[0]});
		}else{
			res.status(response.statusCode).json(configApp.api.addProject.formatResponse(body));
		}
	});*/


//		options.headers[configApp.authentication.headerKey] = token;

/*
		var options = { method: configApp.api.getProjects.method,
			url: 'http://' + ip + configApp.api.getProjects.url,
			headers: {
				'content-type': 'application/json'
			}
		};*/
	/*request(options, function (error, response, body) {
			if (error)
				res.status(500).json({error: "No se ha podido realizar la petición"});
			else if(response.statusCode >= 400 && response.statusCode <= 500){
				res.status(response.statusCode).json({error: body.errors[0]});
			}else{
				let format = configApp.api.getProjects.formatResponse(JSON.parse(body));
				res.status(response.statusCode).json(format);
			}
		});*/


/*

function createProject2(req, res){
    let header = {};
    let body = {};
    if(req.params.app == "jira"){
        header = {
            authorization: 'Basic ' +  base64.encode(utf8.encode(req.body.user +  ":" +  req.body.password)),
           'content-type': 'application/json'
        };

        body = {
            "key": req.body.key,
            "name": req.body.name,
            "projectTypeKey": "business",
            "projectTemplateKey": "com.atlassian.jira-core-project-templates:jira-core-project-management",
            "description": req.body.description,
            "lead": "lfondont",
            "url": "http://atlassian.com",
            "assigneeType": "PROJECT_LEAD",
            "avatarId": 10200
        }
        httpService.post(req.body.ip, req.body.port, config.URL_JIRA_PROJECT, header, body, res);
    }else if(req.params.app == "redmine"){
        header = {
            'x-redmine-api-key': req.body.token,
            'content-type': 'application/json'
        };

        body = {
            "project": {
                "name": req.body.name,
                "identifier": req.body.key,
                "description": req.body.description,
                "homepage": "",
                "status": 1,
                "is_public": true
            }
        }
        httpService.post(req.body.ip, req.body.port, config.URL_REDMINE_PROJECT, header, body, res);
    }
}
*/
>>>>>>> 0588f91cb56eb027066c46f0ee0c35dd6e7644c1
