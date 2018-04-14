/*
* @author luciofondon
* @date 2018
*/

var  projectService = require('../services/ProjectService');

module.exports = function(db) {

    return {
        create: function(req, res) {
            projectService.createProject(req, res);
        }
    }
}