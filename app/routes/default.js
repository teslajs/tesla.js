module.exports = function(app, tesla) {

	var dir = '../../',
			controllers = dir + 'app/controllers/',
			routes = dir + 'app/routes/';
			require('colors');


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //
  // - - - - - - - - - - - - CUSTOM ROUTES GO HERE - - - - - - - - - - - - - //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //


  	// HELLO WORLD ROUTER - example of loading controller if specific path is matched
  	app.get('/hello/world', function(req, res) {
  		require(controllers + 'hello/worldController')(app, res, res);
  	});

  	// FOOBAR CONTROLLER - Example of controller that handles it's own routing
  	require(controllers + 'fooController')(app);

    // EXAMPLE OF DYNAMIC CRUD STYLE ROUTER & CONTROLLER
  	app.get('/crud/:action/:id?', function(req, res) {
  		require(controllers + 'crudController')[req.params.action](app, req, res);
  	});



  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //
  // - - - DANGER ! DON'T EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING - - - //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //


  	// AUTO ROUTER (THIS SHOULD COME AFTER ANY CUSTOME ROUTES)
  	if ( app.config.autoRouting === true ) {
      tesla.log( 'INFO:'.blue + ' using auto router');
  		require(routes + 'system/auto')(app, tesla);
  	}

  	// ERROR HANDLER
  	require(routes + 'system/errors')(app);

};
