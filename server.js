/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    logger = require('mean-logger'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    auth = require('./config/middlewares/authorization'),
    mongoose = require('mongoose'),
    app = module.exports = express();

    require('./config/env/all')(app);
    require('./config/config')(app);

// //Bootstrap db connection
var db = mongoose.connect(app.config.db.url);

//Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

// // require additional config files
// // require('./config/config')(app); //express settings
require('./config/express')(app, db); //express settings
require('./config/routes')(app); // routes

// //Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

// //expose app
exports = module.exports = app;
