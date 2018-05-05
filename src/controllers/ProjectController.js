/*
* @author luciofondon
* @date 2018
*/

var  projectService = require('../services/ProjectService');

module.exports = function(db) {

    return {
        createProject: function(req, res) {
            projectService.createProject(req, res);
        },

		readAllProject: function(req, res) {
            projectService.readAllProject(req, res);
        }
    }
}
