// MODULE DEPENDENCIES
var express = require('express'),
    fs = require('fs'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    app = module.exports = express(),
    colors = require('colors'),
    io = require('socket.io').listen(app),
    tesla, port;


// REQUIRE CONFIG FILES
require('./config/config')(app);
require('./config/env-config')(app);

// LOAD TESLA LIB
tesla = require('./lib/tesla')(app);

tesla.log(' ');
tesla.log(' ');
tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.rainbow);
tesla.log('    > > > FIRING UP THE '.white + 'TESLA'.red + ' SERVER. GET HAPPY! < < < '.white);
tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.rainbow);
tesla.log(' ');

// REQUIRE ADDITIONAL CONFIG FILES
require('./config/express')(app, tesla); //express settings
require('./config/routes')(app, tesla); // routes

// START THE APP BY LISTEN ON <PORT>
port = process.env.PORT || app.config.port;

app.listen(port, function(err) {

	tesla.log(' ');
	tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # #'.green);
	tesla.log('        IT\'S ALIVE!'.white + ' TESLA'.red + ' IS UP AND RUNNING.'.white);
	tesla.log('   POINT YOUR BROWSER TO: '.grey + app.site.url.white);
	tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # #'.green);

})

// EXPOSE APP
exports = module.exports = app;