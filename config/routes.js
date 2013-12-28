var fs = require('fs'),
	colors = require('colors');

module.exports = function(app, tesla) {

	var tesla = require('../lib/tesla')(app);


	// POST
	app.post("/*", function(req, res) {
		res.send('post');
	});

	// PUT
	app.put("/*", function(req, res) {
		res.send('put');
	});

	// GET
	app.get("/*", function(req, res) {

		var uri = require('../lib/uri')(app, req); // require uri module

		// SET VARS
		var notFound = false,
			action = uri.action(),
			ctrl = uri.controller(),
			id = uri.id(),
			loc = '../',
			viewDir = './app/views/',
			ctrlDir = './app/controllers/',
			ctrlFile = ctrlDir + ctrl + 'Controller.js',
			ctrlFileIndex = ctrlDir + ctrl + '/indexController.js',
			ctrlFileAction = ctrlDir + ctrl + '/' + action + 'Controller.js',
			ctrlFileLoaded;

		tesla.log(' ');
		tesla.log('INFO:'.blue + ' GET request received at ' + uri.full().yellow);
		tesla.log('INFO:'.blue + ' Attempting to autoload the correct route' + ' (config/routes.js)');
		tesla.log( 'INFO:'.blue + ' Attempting to load: ' + ctrlFile.yellow.italic );

		// IF CONTROLLER EXIST IN URI, TRY TO LOAD
		if ( ctrl !== '' ) {

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
			} else {
				tesla.log(' ');
				tesla.log( 'ERROR: Tesla tried and failed to load the following controllers:'.red );
				tesla.log( 'NOT FOUND: '.red + ctrlFile.yellow.italic);
				tesla.log( 'NOT FOUND: '.red + ctrlFileIndex.yellow.italic);
				tesla.log( 'NOT FOUND: '.red + ctrlFileAction.yellow.italic);
				notFound = true;
			}

		// LOAD INDEX IF NO CONTROLLER
		} else {

			// MAKE SURE INDEX FILE EXISTS
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


		// SETUP APP VARIABLE TO SEND TO THE CONTROLLER
		app.req = req;
		app.res = res;
		app.controller = ctrl;
		app.action = action;
		app.uri = uri;


		// LOAD CONTROLLER IF IT EXISTS
		if ( notFound === false ) {

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
				// tesla.log( 'ERROR:'.red + ' "exports.'.yellow + action.yellow  + '"'.yellow + ' not found in '.red + ctrlFileLoaded.yellow);
				tesla.log( 'ERROR: Attempt to use'.red + ' "exports.index"'.yellow + ' also failed, throwing 404...'.red);
				throw404(res, req, app);
			}

		} else {


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
					throw404(res, req, app);
				}

			// THROW A 404 IF WE CAN'T FIND THE CONTROLLER + AUTOLOAD FAILS
			} else {
				throw404(res, req, app);
			}
		}

		tesla.log(' ');

	});


function throw404(res, req, app) {
	res.status(404).render('404', {
        title : 'Page Not Found',
        url: req.originalUrl,
        error:'Not found',
        site: app.site
    });
}


// var ctrl, controller, action,
//     notFound = false,
// 	uri = req.url.split('?');

// uri = uri[0].split('/');
// ctrl = uri[1],
// model = ctrl,
// action = uri[2],
// id = uri[3];

};
