var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

module.exports = function (app) {

    app.site = {
        name : "tesla.js", // the name of you app
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
            enabled : true,
            format : 'json',
            access : '*'
        },

        engines : {
            html: "jade", // options: [jade|ejs|haml|hjs|jshtml]
            css: "stylus", // options: [stylus|sass|less]
            cssLibrary: false, // options: [nib|axis]
        },
        root : rootPath,

        db : {
            url : "mongodb://dev:pass@linus.mongohq.com:10074/sandbox" // url to database
        },

        jsonp : true, // allow jsonp requests
        secret : 'MYAPPSECRET',
        protocol : 'http://',
        autoLoad : false, // whether to autoload controllers & models
        publicDir : './public',

        logging : {
            console: true, // whether to allow tesla to log messages to the node console
            files: false // this doesn't do anything yet
        }
    }



    // some default meta setting for head
    app.site.meta = {
        description : '',
        keywords : '',
        viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
        encoding : "utf-8"
    }

}