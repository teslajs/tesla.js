var path = require('path'),
rootPath = path.dirname(require.main.filename);

module.exports = function (app) {

  app.site = {
    name : 'tesla.js', // the name of your app
  };

  app.config = {

    api : {
      enabled : true, // set false to disable json output for scafolding
      format : 'json', // format to output in api views
      access : '*' // placeholder for future api security enhancement
    },

    // BROWSER SYNC - http://www.browsersync.io/docs/gulp/
    browserSync: {
      enable: true,
      files: ['public/**/*.*'],
      notify: false,
      open: false,
      port: 3000
    },

    // see https://github.com/dresende/node-orm2/wiki/Connecting-to-Database for more info on connection to your databse
    db : {
      url : 'driver://username:password@hostname/database', // url to database
      driver : 'mongodb' // which db driver to use
    },

    engines : {
      html : 'jade', // options: (ejs|hbs|hogan|jade|mustache)
      css : 'stylus', // options: (stylus|sass|less) - set false to just use vanilla css
      cssLibrary : false, // options: (axis|bourbon|nib) - set to false for none
    },

    logging : {
      console : true, // whether to allow tesla to log messages to the node console
      file : false // this doesn't do anything yet, eventually it will write .log files
    },

    // WHETHER TO HANDLE CSS & HTML TEMPLATE VIA MIDDLEWARE OR GULP
    middleware: {
      css: false, // set true if you want to process via middleware instead of Gulp
      html: true, // jade, handlebars, etc still need to run through middleware for now
    },

    server : {
      cache : true, // whether to use caching
      gzip : true, // whether to enable gzip compression
      jsonp : true, // allow jsonp requests
      port : 1856, // port to run the server on
      protocol : 'http://', // options: (http|https)
      socket : false // WHETHER TO USE SOCKET.IO
    },

    prettify : {
      html : true, // whether to pretify html
      css : true, // whether to pretify css
      js : true // whether to pretify js
    },

    routes : {
      autoLoad : true, // whether to attempt autoload controllers
      auto : true, // whether to use auto routing
    },

    // DIRECTORIES USED BY THE APP
    system : {
      build : rootPath + '_build/',
      config: rootPath + '/config/',
      controllers: rootPath + '/app/controllers/',
      models: rootPath + '/app/models/',
      public: rootPath + '/public/',
      root : rootPath, // path to the root of your server
      routes: rootPath + '/app/routes/',
      tests: rootPath + '/tests/',
      views: rootPath + '/app/views/'
    }

  };

};
