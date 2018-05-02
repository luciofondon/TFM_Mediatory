
module.exports = function(app) {

    var taskManagerController = require('../controllers/TaskManagerController')();

    app.route('/api/taskmanager/check')
        .post(taskManagerController.checkComunication);

     app.route('/api/taskmanager/apps')
		.get(taskManagerController.getApps);

}
