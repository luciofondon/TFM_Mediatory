
var  issueService = require('../services/IssueService');

module.exports = function(db) {

    return {
        createIssues: function(req, res) {
            issueService.createIssues(req.body).then(function(data){
				return res.status(200).json({data: data});
			}).catch(function(err){
				return res.status(500).json({error: err.error});
            });		
        },

		readAllIssues: function(req, res) {
            issueService.readAllIssues(req.body).then(function(data){
				return res.status(200).json({data: data});
			}).catch(function(err){
				return res.status(500).json({error: err.error});
            });
		}
    }
}
