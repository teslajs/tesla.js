module.exports = function (app, tesla, next) {

	var fs = require('fs'),
			colors = require('colors');

	// GET
	app.get("/*", function(req, res, next) {

		// SET VARS
		var notFound = false,
				uri = require('../../lib/uri')(app, req); // require uri module
				action = uri.action(),
				ctrl = uri.controller(),
				id = uri.id(),
				loc = '../../',
				viewDir = './app/views/',
				ctrlDir = './app/controllers/',
				ctrlFile = ctrlDir + ctrl + 'Controller.js',
				ctrlFileIndex = ctrlDir + ctrl + '/indexController.js',
				ctrlFileAction = ctrlDir + ctrl + '/' + action + 'Controller.js',
				ctrlFileLoaded = false;

		tesla.log(' ');
		tesla.log('INFO:'.blue + ' GET request received at ' + uri.full().yellow);
		tesla.log('INFO:'.blue + ' Attempting to autoload the correct route' + ' (config/routes.js)');

		// IF CONTROLLER EXISTS IN URI, TRY TO LOAD IT
		if ( ctrl !== '' ) {

			var controller = 'no';

			// IF CONTROLLER FILE EXISTS LOAD IT
			if ( fs.existsSync( ctrlFile ) )  {
				controller = require( loc + ctrlFile );
				tesla.log(' ');
				tesla.log( 'SUCCESS:'.green + ' ' + ctrlFile.replace('./', '').yellow + ' was loaded.');
				ctrlFileLoaded = ctrlFile;
			} else if ( fs.existsSync( ctrlFileIndex ) )  {
				controller = require( loc + ctrlFileIndex );
				tesla.log(' ');
				tesla.log( 'SUCCESS:'.green + ' ' + ctrlFileIndex.replace('./', '').yellow + ' was loaded.');
				ctrlFileLoaded = ctrlFileIndex;
			} else if ( fs.existsSync( ctrlFileAction ) )  {
				controller = require( loc + ctrlFileAction );
				tesla.log(' ');
				tesla.log( 'SUCCESS:'.green + ' ' + ctrlFileAction.replace('./', '').yellow + ' was loaded.');
				ctrlFileLoaded = ctrlFileAction;

			// CONTROLLER NOT FOUND
			} else {
				notFound = true;
			}

		// LOAD INDEX IF NO CONTROLLER
		} else {

			// SEE OF INDEX FILE EXISTS
			if ( fs.existsSync( ctrlDir + 'indexController.js' ) )  {
				controller = require( loc + ctrlDir + 'indexController.js' );
				action = 'index';
				ctrlFileLoaded = ctrlDir + 'indexController.js';
				tesla.log( ctrlDir + 'indexController.js' + ' loaded.' );
			// THROW 404 IF IT DOESN'T
			} else {
				notFound = true;
			}

		}


		// SET APP VARIABLE TO SEND TO THE CONTROLLER
		app.req = req;
		app.res = res;
		app.controller = ctrl;
		app.action = action;
		app.uri = uri;

		// LOAD CONTROLLER IF IT EXISTS
		if ( notFound === false ) {

			if ( action.indexOf('.json') >= 0 ) {
				useAction = action.replace('.json', '');
			} else {
				useAction = action;
			}

			// LOAD ACTION
			if ( controller[action] ) {
				tesla.log( 'SUCCESS:'.green + ' Using ' + '"exports.' + action + '"' + ' in ' + ctrlFileLoaded.replace('./', '') );
				controller[action](app);
			// IF ACTION DOESN't EXIST, TRY INDEX
			} else if ( action === '' || action === 'index' ) {
				tesla.log( 'SUCCESS:'.green + ' Using ' + '"exports.index"' + ' in ' + ctrlFileLoaded.replace('./', '') );
				tesla.log(' ');
				controller.index(app);
			// IF NO INDEX, THROW 404
			} else {
				tesla.log(' ');

				tesla.log( 'ERROR: Attempt to use'.red + ' "exports.index"'.yellow + ' failed, throwing 404...'.red);

				// THROW 404
				next( tesla.throw(404) );
			}


		// IF CONTROLLER FILE WAS NOT FOUND
		} else {

			// ATTEMPT TO USE AUTO CONTROLLER IF ALLOWED
			if ( app.config.autoLoad === true ) {

				// TRY TO LOAD APP/VIEWS/CONTROLLER
				if ( fs.existsSync( viewDir + ctrl + '.' + app.config.engines.html ) )  {
					require('../app/controllers/autoController').render(app, ctrl);
				// TRY TO LOAD APP/VIEWS/CONTROLLER/INDEX
				} else if ( fs.existsSync( viewDir + '/' + ctrl + '/index.' + app.config.engines.html ) ) {
					require('../app/controllers/autoController').render(app, ctrl + '/index');
				// TRY TO LOAD APP/VIEWS/CONTROLLER/ACTION
				} else if (  fs.existsSync( viewDir + '/' + ctrl + '/' + action + '.' + app.config.engines.html ) ) {
					require('../app/controllers/autoController').render(app, ctrl + '/' + action);
				// TRY TO LOAD APP/VIEWS/CONTROLLER/ACTION/INDEX
				} else if (  fs.existsSync( viewDir + '/' + ctrl + '/' + action + '/index.' + app.config.engines.html ) ) {
					require('../app/controllers/autoController').render(app, ctrl + '/' + action + '/index');

				// IF NO VIEW CAN BE FOUND, THROW A 404
				} else {

					next( tesla.throw(404) );

				}

			// THROW A 404 IF WE CAN'T FIND THE CONTROLLER & AUTOLOAD FAILS
			} else {
				next( tesla.throw(404) );
			}

		}

	});

};