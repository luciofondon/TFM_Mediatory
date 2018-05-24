
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Configuracion del servidor
 */

var express = require("express"),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    config = require('./config/config'),
    MongoClient = require('mongodb').MongoClient,
    logger = require('morgan'),    
    app = express(),
    router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logger('dev')); 
app.use(router);


//Anadir routes de los controladores
require('./src/routes/IssueRoute')(app);
require('./src/routes/ProjectRoute')(app);
require('./src/routes/TaskManagerRoute')(app);


app.listen(config.SERVER_PORT, function() {
    console.log("INFO: TFM Mediatory running on http://localhost:" + config.SERVER_PORT);
});
