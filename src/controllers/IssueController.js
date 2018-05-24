
var  issueService = require('../services/IssueService');

module.exports = function(db) {

    return {
        createIssues: function(req, res) {
            issueService.createIssues(req.body.config, req.body.issues).then(function(response){
				return res.status(200).json({data: response.data});
			}).catch(function(err){
				return res.status(500).json({error: err.error});
            });
        },

		readAllIssues: function(req, res) {
            issueService.readAllIssues(req.body).then(function(response){
				return res.status(200).json({data: response.data});
			}).catch(function(err){
				return res.status(500).json({error: err.error});
            });
		}
    }
}
