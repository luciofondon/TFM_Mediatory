var  issueService = require('../services/IssueService');


module.exports = function(db) {

    return {
        createIssues: function(req, res) {
            issueService.createIssues(req, res);
		},

		readAllIssues: function(req, res) {
            issueService.readAllIssues(req, res);
		}
    }
}
