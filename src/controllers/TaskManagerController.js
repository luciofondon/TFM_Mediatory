var  taskManagerService = require('../services/TaskManagerService');

module.exports = function(db) {

    return {
        checkComunication: function(req, res) {
            taskManagerService.checkComunication(req.body).then(function(data){
				return res.status(200).json({data: data});
			}).catch(function(err){
				return res.status(500).json({error: err.error});
            }); 		
        },

        getApps: function(req, res) {
            taskManagerService.getApps(req.body).then(function(data){
				return res.status(200).json({data: data});
			}).catch(function(err){
				return res.status(500).json({error: err.error});
            }); 
        }
    }
}
