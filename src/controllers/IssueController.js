var  issueService = require('../services/IssueService');


module.exports = function(db) {

    return {
        create: function(req, res) {
            issueService.createIssue(req, res);
        }
    }
}