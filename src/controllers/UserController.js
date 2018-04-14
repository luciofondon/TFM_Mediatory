var  userService = require('../services/UserService');

module.exports = function(db) {

    return {
        create: function(req, res) {
            userService.createUser(req, res);
        }
    }
}