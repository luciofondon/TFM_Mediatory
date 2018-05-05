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
}

exports.readAllProject = function(req, res) {
    readAllProject(req, res);
}

function createProject(req, res){
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

function readAllProject(req, res){
	let configServer = req.body
	let configApp = {};
	appManagement.apps.forEach(function(app){
		if(app.id == configServer.app){
			configApp = app;
		}
	});

	//let ip = configServer.app + ":" + configServer.port;
	let ip = "158.49.112.112";
	var options = { method: configApp.api.getProjects.method,
	 	 url: 'http://' + ip + configApp.api.getProjects.url,
	 	 headers: {'content-type': 'application/json' }
	};
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		let projectsFormat = [];
		let format = configApp.api.getProjects.format(JSON.parse(body))
		res.status(response.statusCode).json(format);
	});
}
