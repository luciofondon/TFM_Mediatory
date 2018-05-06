/*
* @author luciofondon
* @date 2018
*/
var base64 = require('base-64'),
    utf8 = require('utf8');

var httpService = require('./HttpService'),
	appManagement = require('../../config/AppManagement');

var request = require("request");

exports.createProject = function(req, res) {
    createProject(req, res);
};

exports.readAllProject = function(req, res) {
    readAllProject(req, res);
};

//let token = 'f5785d571a9266a99d5624f2db99e914c7dda844';
//let ip = "158.49.112.112";

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
		if (error)
			res.status(500).json({error: "No se ha podido realizar la petición"});
		else if(response.statusCode >= 400 && response.statusCode <= 500){
			res.status(response.statusCode).json({error: body.errors[0]});
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
			let format = configApp.api.getProjects.format(JSON.parse(body));
			res.status(response.statusCode).json(format);
		}
	});
}


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
