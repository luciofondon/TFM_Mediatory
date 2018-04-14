module.exports = function(app) {
    
      var issueController = require('../controllers/IssueController')();
    
      app.route('/api/issue/:server/:port')
        .post(issueController.create);
}