// MODULE DEPENDENCIES
var express = require('express'),
    fs = require('fs'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    mongoose = require('mongoose'),
    app = module.exports = express(),
    colors = require('colors'),
    io = require('socket.io').listen(app);


require('./config/config')(app);

var tesla = require('./tesla_modules/tesla')(app);

tesla.log(' ');
tesla.log(' ');
tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.rainbow);
tesla.log('    > > > FIRING UP THE '.white + 'TESLA'.red + ' SERVER. GET HAPPY! < < < '.white);
tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.rainbow);
tesla.log(' ');

// REQUIRE CONFIG FILES
require('./config/env-config')(app);

// BOOTSTRAP DB CONNECTION
var db = mongoose.connect(app.config.db.url);

// BOOTSTRAP MODELS
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

// REQUIRE ADDITIONAL CONFIG FILES
require('./config/express')(app, tesla); //express settings
require('./config/routes')(app, tesla); // routes

// STAR THE APP BY LISTEN ON <PORT>
var port = process.env.PORT || config.port;
app.listen(port);

tesla.log(' ');
tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # #'.green);
tesla.log('        IT\'S ALIVE!'.white + ' TESLA'.red + ' IS UP AND RUNNING.'.white);
tesla.log('   POINT YOUR BROWSER TO: '.grey + app.site.url.white);
tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # #'.green);

// console.log(app);


// EXPOSE APP
exports = module.exports = app;
