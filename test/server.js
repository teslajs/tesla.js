var tesla,
		http = require('http'),
		express = require('express'), // GET EXPRESS
		app = module.exports = express(), // DEFINE THE APP
		server = require('http').createServer(app); // CREATE THE SERVER


require('colors'); // PRETTY CONSOLE LOGGING
require('fs'); // FILE SYSTEM
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('../config/_settings')(app); // MAIN APP SETTINGS
app.config.logging.console = false; // DISABLE CONSOLE LOGGING
tesla = require('../lib/tesla')(app);
require('../config/environment/' + process.env.NODE_ENV)(app); // ENVIRONMENT SPECIFIC SETTINGS
require('../config/express')(app, tesla); // EXPRESS SETTINGS
require('../app/routes/default')(app, tesla); // DEFAULT ROUTES
require('chai').should();

describe('The Server', function(){

		// START THE SERVER AND MAKE SURE WE GET A 200 RESPONSE
		it('should start.', function (done) {

			server.listen( process.env.PORT || app.config.port);

	      http.get('http://localhost:' + app.config.port, function (res) {
	        // assert.equal(200, res.statusCode);
					res.statusCode.should.equal(200);
	        done();
	      });

    });

});


describe('Default Environment', function(){

	// MAKE SURE ENVIRONMENT IS SET
  it('should be defined', function(){

		process.env.NODE_ENV.should.be.a('string');

  });


	// BE SURE THE PORT NUMBER IS SET
	it('should have the port set', function(){

		if ( typeof process.env.PORT !== 'undefined' ) {
			process.env.PORT.should.be.a('number');
		} else {
			app.config.port.should.be.a('number');
		}

	});


});
