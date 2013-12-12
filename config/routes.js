var fs = require('fs');

module.exports = function(app) {

	// APPLY TITLE CASING TO A STRING
	function titleCase (str) {

	    return str.replace(/\w\S*/g, function (txt) {
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });

	};

	app.get("/*", function(req, res) {

	    var ctrl, controller, action,
		    notFound = false,
	    	uri = req.url.split('?');

	    uri = uri[0].split('/');
	    ctrl = uri[1],
	    model = ctrl,
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
				} else if ( fs.existsSync( './app/controllers/' + ctrl + '.js' ) ) {
					console.log( 'attempting to load: ' + 'app/controllers/' + ctrl );
					console.log( 'controller exists: ' + fs.existsSync( './app/controllers/' + ctrl + '.js' ) );
					controller = require( '../app/controllers/' + ctrl );
				} else {
					notFound = true;
				}

		    // IF NO ACTION IS REQUESTED
			} else {

				action = 'index';

				console.log( 'attempting to load: ' + 'app/controllers/' + ctrl );
				console.log( 'controller exists: ' + fs.existsSync( './app/controllers/' + ctrl + '.js' ) );

				if ( fs.existsSync( './app/controllers/' + ctrl + '.js' ) ) {
					controller = require( '../app/controllers/' + ctrl );
				} else {
					notFound = true;
				}
			}

		// USE DEFAULT CONTROLLER IF NONE SPECIFIED
		} else {

			console.log( 'attempting to load: ' + 'app/controllers/default' );
			console.log( 'controller exists: ' + fs.existsSync( './app/controllers/default' + '.js' ) );

			if ( fs.existsSync( './app/controllers/default.js' ) ) {
				var controller = require('../app/controllers/default');
				ctrl = 'default';
				model = 'page';
				action = 'index';
			} else {
				notFound = true;
			}
		}

		// SETUP APP VARIABLE TO SEND TO THE CONTROLLER
		app.req = req;
		app.res = res;
		app.model = titleCase(model);
		app.controller = ctrl;
		app.action = action;
		app.uri = uri;

		// LOAD CONTROLLER IF IT EXISTS
		if ( notFound === false ) {

			// Use auto controller
			if ( app.config.autoLoad === true ) {
				require('../app/controllers/auto').render(app);
			} else {
				controller.render(app);
			}


		// THROW A 404 IF WE CAN'T FIND THE CONTROLLER
		} else {
			res.status(404).render('404', {
	            title : app.site.name + ' - Not Found',
	            url: req.originalUrl,
	            error: 'Not found',
	            site: app.site
	        });
		}


	});


};
