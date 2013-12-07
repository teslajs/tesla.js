var fs = require('fs');

module.exports = function(app) {

	app.get("/*", function(req, res) {

	    var ctrl, controller, action,
		    notFound = false,
	    	uri = req.url.split('?');

	    uri = uri[0].split('/');
	    ctrl = uri[1],
	    action = uri[2];

	 	console.log('current dir: ' + __dirname );

		// IF CONTROLLER IS SPECIFIED
		if ( ctrl !== '' ) {

			// IF ACTION IS SPECIFIED
			if ( action !== '' && action !== 'undefined' ) {

				console.log( 'attempting to load: ' + 'app/controllers/' + ctrl + '/' + action );
				console.log( 'controller exists: ' + fs.existsSync( './app/controllers/' + ctrl + '/' + action + '.js' ) );

				if ( fs.existsSync( './app/controllers/' + ctrl + '/' + action + '.js' ) )  {
					controller = require( '../app/controllers/' + ctrl + '/' + action );
				} else {
					notFound = true;
				}

		    // IF NO ACTION IS REQUESTED
			} else {

				console.log( 'attempting to load: ' + 'app/controllers/' + ctrl );

				if ( fs.existsSync( './app/controllers/' + ctrl + '.js' ) ) {
					controller = require( '../app/controllers/' + ctrl );
				} else {
					notFound = true;
				}
			}

		// USE DEFAULT CONTROLLER IF NONE SPECIFIED
		} else {

			if ( fs.existsSync( './app/controllers/default.js' ) ) {
				var controller = require('../app/controllers/default');
			} else {
				notFound = true;
			}
		}

		// LOAD CONTROLLER IF IT EXISTS
		if ( notFound === false ) {
			controller.render(req, res, app);

		// THROW A 404 IF WE CAN'T FIND THE CONTROLLER
		} else {
			res.status(404).render('404', {
	            pageTitle : app.site.name + ' - Not Found',
	            url: req.originalUrl,
	            error: 'Not found',
	            site: app.site
	        });
		}


	});


};
