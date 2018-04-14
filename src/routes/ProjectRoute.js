/*
* @author luciofondon
* @date 2018
*/

module.exports = function(app) {
    
      var projectController = require('../controllers/ProjectController')();
    
      app.route('/api/project/:app')
        .post(projectController.create);
}