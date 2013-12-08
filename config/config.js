var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

module.exports = function (app) {

    app.site = {
        name : "Tesla.js", // the name of you app
    }

    app.config = {
        port : 3000, // port to run the server on

        prettify : {
            html : true, // whether to pretify html
        },

        engines : {
            html: "jade", // jade, ejs, haml, hjs (hogan)
            css: "stylus", // styles, sass, less
        },
        root : rootPath,

        db : {
            url : "mongodb://localhost/db-name" // url to database
        },

        jsonp : true, // allow jsonp requests
        secret : 'MYAPPSECRET',
        protocol : 'http://',
        autoLoad : false, // whether to autoload controllers & models
    }



    // some default meta setting for head
    app.site.meta = {
        description : '',
        keywords : '',
        viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
        encoding : "utf-8"
    }

}