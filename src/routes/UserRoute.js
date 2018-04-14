module.exports = function(app) {
    
      var userController = require('../controllers/userController')();
    
      app.route('/api/user/:server/:port')
        .post(userController.create);
}