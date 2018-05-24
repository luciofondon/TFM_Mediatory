module.exports = function(app) {

    var issueController = require('../controllers/IssueController')();

	app.route('/api/issues/create')
		.post(issueController.createIssues);

	app.route('/api/issues/read')
		.post(issueController.readAllIssues);

}
