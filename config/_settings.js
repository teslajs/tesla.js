var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

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

    autoLoad : true, // whether to attempt autoload controllers

    autoRouting : true, // whether to use auto routing

    cache : true, // whether to use caching

    // see https://github.com/dresende/node-orm2/wiki/Connecting-to-Database for more info on connection to your databse
    db : {
      url : 'driver://username:password@hostname/database', // url to database
      driver : 'mongodb' // which db driver to use
    },

    engines : {
      html : 'jade', // options: (ejs|handlebars|hogan|jade|mustache)
      css : false, // options: (stylus|sass|less) - set false to just use vanilla css
      cssLibrary : false, // options: (axis|bourbon|nib) - set to false for none
    },

    gzip : true, // whether to enable gzip compression

    jsonp : true, // allow jsonp requests

    liveReload : {
      use : true,
      port : 35729, // port to run the server on
    },

    logging : {
      console : true, // whether to allow tesla to log messages to the node console
      files : false // this doesn't do anything yet, eventually it will write .log files
    },

    port : 1856, // port to run the server on

    prettify : {
      html : true, // whether to pretify html
      css : true, // whether to pretify css
      js : true // whether to pretify js
    },

    protocol : 'http://', // options: (http|https)

    publicDir : './public', // public directory where images, javascript, css, etc is stored

    root : rootPath, // path to the root of your server

    secret : 'MYAPPSECRET', // placeholder for now, will be implemented later

    socket : false // WHETHER TO USE SOCKET.IO

  };


  // some default meta settings for <head>
  app.site.meta = {
    description : '',
    encoding : 'utf-8',
    keywords : '',
    viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'
  };

};
