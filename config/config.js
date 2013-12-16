var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

module.exports = function (app) {

    app.site = {
        name : "{{name}}", // the name of you app
    }

    app.config = {
        port : 3000, // port to run the server on

        prettify : {
            html : true, // whether to pretify html
            css : true, // whether to pretify css
            js : true // whether to pretify js
        },

        cache : false, // whether to use caching

        engines : {
            html: "{{html}}", // options: [jade|ejs|haml|hjs|jshtml]
            css: "{{css}}", // options: [stylus|sass|less]
            cssLibrary: '{{cssLibrary}}', // options: [nib|axis]
        },
        root : rootPath,

        db : {
            url : "mongodb://localhost/pegnote" // url to database
        },

        jsonp : true, // allow jsonp requests
        secret : 'MYAPPSECRET',
        protocol : 'http://',
        autoLoad : false, // whether to autoload controllers & models
        publicDir : './public',
    }



    // some default meta setting for head
    app.site.meta = {
        description : '',
        keywords : '',
        viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
        encoding : "utf-8"
    }

}