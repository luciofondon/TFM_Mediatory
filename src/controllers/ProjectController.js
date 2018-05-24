/*
* @author luciofondon
* @date 2018
*/

var  projectService = require('../services/ProjectService');

module.exports = function(db) {

    return {
        createProject: function(req, res) {
            projectService.createProject(req.body.config, req.body.project).then(function(data){
				return res.status(200).json({data: data});
			}).catch(function(err){
				return res.status(500).json({error: err.error});
			});
        },

		readAllProject: function(req, res) {
            projectService.readAllProject(req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json({error: err.error});
            });        
        }
    }
}
