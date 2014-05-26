// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //
// - - - DANGER ! DON'T EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //

module.exports = function (app, tesla, next) {

	function titleCase(str) {  // APPLY TITLE CASING TO A STRING

    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

  } // END: TITLECASE

  var fs = require('fs');
      require('colors');

  // GET
  app.get('/*', function(req, res, next) {

    // SET VARS
    var notFound = false,
        uri = require('../../../lib/uri')(app, req), // require uri module
        action = uri.action(),
				controller = 'no',
        ctrl = uri.controller(),
        loc = '../../../',
        viewDir = './app/views/',
        ctrlDir = './app/controllers/',
        ctrlFile = ctrlDir + ctrl + 'Controller.js',
        ctrlFileIndex = ctrlDir + ctrl + '/indexController.js',
        ctrlFileAction = ctrlDir + ctrl + '/' + action + 'Controller.js',
        viewExt = app.config.engines.html,
        ctrlFileLoaded = false,
				useAction;

    if ( viewExt === 'hogan' ) {
    	viewExt = 'mustache';
    }

    // IF CONTROLLER EXISTS IN URI, TRY TO LOAD IT

    if ( uri.full().indexOf('favicon.ico') <= 0 && uri.full().indexOf('socket.io/') <= 0 ) {

			tesla.log(' ');
			tesla.log('INFO:'.blue + ' GET request received at ' + uri.full().yellow);

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
	        tesla.log( 'ERROR: '.red + 'view not found. Throwing 404.' );
	        next( tesla.throw(404) );
	      }


	    // IF CONTROLLER FILE WAS NOT FOUND
	    } else {

	      // ATTEMPT TO USE AUTO CONTROLLER IF ALLOWED
	      if ( app.config.autoLoad === true ) {

	        // LOAD: app/views/controller/action/index.js
					if (  fs.existsSync( viewDir + '/' + ctrl + '/' + action + '/index.' + viewExt ) ) {

					  if ( fs.existsSync( ctrlDir + 'autoController.js') ) {
					    tesla.log( 'INFO: '.blue + 'using ' + ctrlDir.yellow + 'autoController.js'.yellow + ' controller' );
					    tesla.log( 'INFO: '.blue + 'attempting to load ' + viewDir.yellow + ctrl.yellow + '/'.yellow + action.yellow + '/index.'.yellow + viewExt.yellow + ' view');

					    require('../../../app/controllers/autoController').render(app, ctrl + '/' + action + '/index');
					  } else {
					    tesla.log( 'ERROR: '.red + ' auto controller not found, throwing 404' ) ;
					    next( tesla.throw(404) );
					  }


					// LOAD: app/views/controller/action.js
					} else if (  fs.existsSync( viewDir + '/' + ctrl + '/' + action + '.' + viewExt ) ) {

					  if ( fs.existsSync( ctrlDir + 'autoController.js') ) {
					    tesla.log( 'INFO: '.blue + 'using ' + ctrlDir.yellow + 'autoController.js'.yellow + ' controller' );
					    tesla.log( 'INFO: '.blue + 'attempting to load ' + viewDir.yellow + ctrl.yellow + '/'.yellow + action.yellow + '.' + viewExt.yellow + ' view');
					    require('../../../app/controllers/autoController').render(app, ctrl + '/' + action);
					  } else {
					    tesla.log( 'ERROR: '.red + ' auto controller not found, throwing 404' ) ;
					    next( tesla.throw(404) );
					  }


					// LOAD: app/views/controller/index.js
					} else if ( fs.existsSync( viewDir + '/' + ctrl + '/index.' + viewExt ) ) {

					  if ( fs.existsSync( ctrlDir + 'autoController.js') ) {
					    tesla.log( 'INFO: '.blue + 'using ' + ctrlDir.yellow + 'autoController.js'.yellow + ' controller' );
					    tesla.log( 'INFO: '.blue + 'attempting to load ' + viewDir.yellow + ctrl.yellow + '/index.'.yellow + viewExt.yellow + ' view');
					    require('../../../app/controllers/autoController').render(app, ctrl + '/index');
					  } else {
					    tesla.log( 'ERROR: '.red + ' auto controller not found, throwing 404' ) ;
					    next( tesla.throw(404) );
					  }


					// LOAD: app/views/controllerAction.js
					} else if ( fs.existsSync( viewDir + ctrl + titleCase(action) + '.' + viewExt ) )  {

					  if ( fs.existsSync( ctrlDir + 'autoController.js') ) {
					    tesla.log( 'INFO: '.blue + 'using ' + ctrlDir.yellow + 'autoController.js'.yellow + ' controller' );
					    tesla.log( 'INFO: '.blue + 'attempting to load ' + viewDir.yellow + ctrl.yellow + titleCase(action).yellow + '.' + viewExt.yellow + ' view');
					    require( '../../../app/controllers/autoController' ).render(app, ctrl + titleCase(action));
					  } else {
					    tesla.log( 'ERROR: '.red + ' auto controller not found, throwing 404' ) ;
					    next( tesla.throw(404) );
					  }


					// LOAD: app/views/controller.js
					} else if ( fs.existsSync( viewDir + ctrl + '.' + viewExt ) )  {

					  if ( fs.existsSync( ctrlDir + 'autoController.js') ) {
					    tesla.log( 'INFO: '.blue + 'using' + ctrlDir.yellow + 'autoController.js'.yellow + ' controller' );
					    tesla.log( 'INFO: '.blue + 'attempting to load ' + viewDir.yellow + ctrl.yellow + '.' + viewExt.yellow + ' view');
					    require( '../../../app/controllers/autoController' ).render(app, ctrl);
					  } else {
					    tesla.log( 'ERROR: '.red + ' auto controller not found, throwing 404' ) ;
					    next( tesla.throw(404) );
					  }


					// THROW A 404 IF WE CAN'T FIND THE CONTROLLER & AUTOLOAD FAILS
					} else {

					  tesla.log( 'ERROR:'.red + ' controller not found.');
					  next( tesla.throw(404) );
					}

	      // THROW A 404 IF WE CAN'T FIND THE CONTROLLER & AUTOLOAD FAILS
	      } else {

	        tesla.log( 'ERROR:'.red + ' controller not found.');
	        next( tesla.throw(404) );
	      }

	    }

    }

  });

};
