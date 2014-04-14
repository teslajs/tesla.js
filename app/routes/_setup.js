module.exports = function(app, tesla) {

	var dir = '../../',
      fs = require('fs'),
      colors = require('colors');
      tesla = require(dir + 'lib/tesla')(app),
			controllers = dir + 'app/controllers/',
			routes = dir + 'app/routes/';


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //
  // - - - - - - - - - - - - CUSTOM ROUTES GO HERE - - - - - - - - - - - - - //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //


  	// HELLO WORLD ROUTER - example of loading controller if specific path is matched
  	app.get("/hello/world", function(req, res) {
  		require(controllers + 'hello/worldController')(app, res, res);
  	});

  	// FOOBAR CONTROLLER - Example of controller that handles it's own routing
  	require(controllers + 'fooController')(app);

    // EXAMPLE OF CRUD STYLE ROUTER & CONTROLLER
  	app.get("/:controller/:action/:id?", function(req, res) {
  		require(controllers + req.params.controller + 'Controller')[req.params.action](app, req, res);
  	});




  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //
  // - - - DANGER ! DON'T EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING - - - //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //


  	// AUTO ROUTER (THIS SHOULD COME AFTER ANY CUSTOME ROUTES)
  	if ( app.config.autoRouting === true ) {
  		require(routes + 'auto')(app, tesla);
  	}

  	// ERROR HANDLER
  	require(routes + 'errors')(app);

};
