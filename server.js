var tesla,
    express = require('express'), // GET EXPRESS
    app = module.exports = express(), // DEFINE THE APP
    server = require('http').createServer(app); // CREATE THE SERVER
    require('colors'); // PRETTY CONSOLE LOGGING
    require('fs'); // FILE SYSTEM
    process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // SET DEFAULT ENVIRONMENT

// LOAD CONFIG & TESLA CLASS
require('./config/_settings')(app); // MAIN APP SETTINGS
tesla = require('./lib/tesla')(app);
tesla.inform(app, 'start'); // WELCOME MESSAGE

// REQUIRED SETTINGS & CONFIG FILES
require('./config/environment/' + process.env.NODE_ENV)(app); // ENVIRONMENT SPECIFIC SETTINGS
require('./config/express')(app, tesla); // EXPRESS SETTINGS
require('./app/routes/default')(app, tesla); // DEFAULT ROUTES


// ADD SOCKET.IO
if ( app.config.socket === true ) {
  app.io = require('socket.io').listen(server);
}

// START THE APP BY LISTEN ON <PORT>
server.listen( process.env.PORT || app.config.port, function( err ) {

  if ( !err ) { // IF THERE'S NO ERRORS
    tesla.inform(app, 'done');
  } else { // OH NOES! SOMETHING WENT WRONG!
    tesla.inform(app, 'error', err);
  }

});

// HANDLE UNCAUGHT ERRORS
process.on('uncaughtException', function(err) {

  if(err.errno === 'EADDRINUSE') {
    tesla.inform(app, 'eaddr');
  } else {
    tesla.inform(app, 'error', err);
  }

  process.exit(1);

});

// EXPOSE APP
exports = module.exports = app;
