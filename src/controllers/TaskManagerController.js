var  taskManagerService = require('../services/TaskManagerService');

module.exports = function(db) {

    return {
        checkComunication: function(req, res) {
            taskManagerService.checkComunication(req, res);
		},

        getApps: function(req, res) {
			console.log("Entra")
            taskManagerService.getApps(req, res);
        }
    }
}
