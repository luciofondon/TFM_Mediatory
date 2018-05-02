var httpService = require('../services/HttpService'),
	appManagement = require('../../config/AppManagment');


exports.checkComunication = function(req, res) {
    checkComunication(req, res);
};

exports.getApps = function(req, res) {
    getApps(req, res);
};

function getApps(req, res){
	let response = [];
	appManagement.apps.forEach(function(app){
		let item = {};
		item.id = app.id;
		item.name = app.name;
		response.push(item);
	});
	res.json(response);
}


function checkComunication(req, res){
	res.json({status: "Se ha establecido correctamente la conexion"});

}
