module.exports = function(app) {

	require('colors');

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //
  // - - - DANGER ! DON'T EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING - - - //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //

		var test = 'hello';

  	// AUTO ROUTER (THIS SHOULD COME AFTER ANY CUSTOM ROUTES)
  	if ( app.config.routes.auto === true ) {
  		require(app.config.system.routes + 'system/auto')(app);
  	}

  	// ERROR HANDLER
  	require(app.config.system.routes + 'system/errors')(app);

};
