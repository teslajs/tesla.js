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

// WELCOME MESSAGE
tesla.log(' ');
tesla.log(' ');
tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.rainbow);
tesla.log('       > > > FIRING UP THE SERVER. GET HAPPY! < < < '.white);
tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.rainbow);
tesla.log(' ');


// REQUIRED SETTINGS & CONFIG FILES
require('./config/environment/' + process.env.NODE_ENV)(app); // ENVIRONMENT SPECIFIC SETTINGS
require('./config/express')(app, tesla); // EXPRESS SETTINGS
require('./app/routes/default')(app, tesla); // DEFAULT ROUTES


// START THE APP BY LISTEN ON <PORT>
server.listen( process.env.PORT || app.config.port, function( err ) {

  // IF THERE'S NO ERRORS
  if ( !err ) {
    tesla.log(' ');
    tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.green);
    tesla.log('IT\'S ALIVE! POINT YOUR BROWSER TO: '.white + app.site.url.grey);
    tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'.green);

  // OH NOES! SOMETHING WENT WRONG!
  } else {
    tesla.log(' ');
    tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
    tesla.log('ERROR:');
    tesla.log(err.white);
    tesla.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # #'.red);
  }

});

// SOCKETS
if ( app.config.socket === true ) {
  var io = require('socket.io').listen(server); // IN CASE WE WANT SOCKET.IO
  require('./app/sockets/info.js')(io, app);
}

// EXPOSE APP
exports = module.exports = app;
