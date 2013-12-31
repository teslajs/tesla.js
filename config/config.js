var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

module.exports = function (app) {

    app.site = {
        name : "tesla.js", // the name of your app
    }

    app.config = {
        port : 3000, // port to run the server on

        prettify : {
            html : true, // whether to pretify html
            css : true, // whether to pretify css
            js : true // whether to pretify js
        },

        cache : false, // whether to use caching

        api : {
            enabled : true, // set false to disable json output for scafolding
            format : 'json', // format to output in api views
            access : '*' // placeholder for future api security enhancement
        },

        engines : {
            html: "jade", // options: (ejs|handlebars|hogan|jade|mustache)
            css: "stylus", // options: (stylus|sass|less) - set false to just use vanilla css
            cssLibrary: false, // options: (axis|bourbon|nib) - set to false for none
        },

        root : rootPath, // path to the root of your server

        // see https://github.com/dresende/node-orm2/wiki/Connecting-to-Database for more info on connection to your databse
        db : {
            url : "driver://username:password@hostname/database", // url to database
            driver: "mongodb" // which db driver to use
        },

        jsonp : true, // allow jsonp requests
        secret : 'MYAPPSECRET', // placeholder for now, will be implemented later
        protocol : 'http://', // options: (http|https)
        autoLoad : true, // whether to attempt autoload controllers
        publicDir : './public', // public directory where images, javascript, css, etc is stored

        logging : {
            console: true, // whether to allow tesla to log messages to the node console
            files: false // this doesn't do anything yet, eventually it will write .log files
        }
    }


    // some default meta setting for site <head>
    app.site.meta = {
        description : '',
        keywords : '',
        viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
        encoding : "utf-8"
    }

}