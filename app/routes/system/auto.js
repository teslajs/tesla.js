// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //
// - - - DANGER ! DON'T EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //

module.exports = function (app, next) {

  function setController(file) {

    var action, ctrl, output = file.split('/'),
        found = false;
        action = file.split('/').pop();
        output = output.splice(0,output.length-1).join('/');

    if ( fs.existsSync( app.config.system.controllers + output + 'Controller.js' ) )  {
      ctrl = app.config.system.controllers + output + 'Controller.js';
      found = true;
      file = output;

      return {
        action : action,
        ctrl : ctrl,
        file : file,
        found : found
      };

    } else if ( fs.existsSync( app.config.system.controllers + output + '/indexController.js' ) )  {
      ctrl = app.config.system.controllers + output + '/indexController.js';
      found = true;
      file = output;

      return {
        action : action,
        ctrl : ctrl,
        file : file,
        found : found
      };

    } else {
      return false;
    }

  }

  var fs = require('fs');
      require('colors');

  // GET
  app.use( function(req, res, next) {

		var action, ctrl, log,
        notFound = false,
				uri = require('../../../lib/uri')(app, req),
        found = false,
        file = uri.full();

			if( file.substr(-1) === '/' ) file = file.substr(0, file.length - 1); // kill trailing slash
      if ( file.charAt(0) ) file = file.substring(1);
      if ( file === '' ) file = 'index';

      action = file.split('/').pop();

      // Try controllers/path/to/fileController.js
			if ( fs.existsSync( app.config.system.controllers + file + 'Controller.js' ) )  {
				ctrl = app.config.system.controllers + file + 'Controller.js';
				// console.log( 'SUCCESS:'.green + ' ' + ctrl.yellow + ' was loaded.');
				found = true;

      // Try controllers/path/to/file/indexController.js
      } else if ( fs.existsSync( app.config.system.controllers + file + '/indexController.js' ) )  {
				ctrl = app.config.system.controllers + file + '/indexController.js';
				// console.log( 'SUCCESS:'.green + ' ' + ctrl.yellow + ' was loaded.');
				found = true;


			} else {

        var theController = setController(file);

        if ( theController.found ) {
          action = theController.action;
          ctrl = theController.ctrl;
          file = theController.file;
          found = theController.found;
        }

      }


      if ( found === true ) {

        if ( action === file ) action = 'index';

        var controller = require( ctrl );

        // Check if exports.action exists in controller
        if (typeof controller[action] === 'function') {
          controller[action](app, req, res);

        // Check if module.exports contain res.render('action') in controller
        } else if (typeof controller === 'function') {
          controller(app, req, res);

        // Throw an error if we can't call the controller
        } else {
          var err = new Error( 500 );
              err.code = 500;
              err.message = 'Controller Error!';
              err.stack = 'Error in controller: ' + ctrl + '\n\n';
              err.stack = err.stack + 'File was found, but was not properly formatted and could not be loaded. Expected to find:\n\n';
              err.stack = err.stack + 'exports.' + action + '  = function(app, req, res) {\n';
              err.stack = err.stack + '  res.render(\'index\');\n';
              err.stack = err.stack + '}\n\n';
              err.stack = err.stack + 'or\n\n';
              err.stack = err.stack + 'module.exports = function(app, req, res) {\n';
              err.stack = err.stack + '  res.render(\'' + action + '\');\n';
              err.stack = err.stack + '}\n';

          next(err);
        }

      } else {
        next();
      }


  });

};
