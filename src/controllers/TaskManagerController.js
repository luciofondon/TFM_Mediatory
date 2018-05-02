var  taskManagerDAO = require('../services/TaskManagerDAO');

module.exports = function(db) {

    return {
        checkComunication: function(req, res) {
            taskManagerDAO.checkComunication(req, res);
        },
        getApps: function(req, res) {
            taskManagerDAO.getApps(req, res);
        }
    }
}
