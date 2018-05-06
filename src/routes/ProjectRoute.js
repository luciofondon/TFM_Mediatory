/*
* @author luciofondon
* @date 2018
*/

module.exports = function(app) {

    var projectController = require('../controllers/ProjectController')();

    app.route('/api/projects/all')
		.post(projectController.readAllProject);

	app.route('/api/projects/create')
    	.post(projectController.createProject);

}
