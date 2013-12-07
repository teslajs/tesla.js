var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

module.exports = function (app) {

    // config setting
    app.config = {
        root : rootPath,
        port : 3000,
        db : {
            url : "mongodb://localhost/site-name-dev"
        },
        engines : {
            html: "jade", // jade, ejs, haml, hjs (hogan)
            css: "stylus", // styles, sass, less
        },
        prettify : {
            html : true,
        },
        jsonp : true,
        secret : 'MYAPPSECRET',
        protocol : 'http://',
        autoLoad : false, // whether to autoload controllers & models
    }

    // global settings
    app.site = {
        name : "Cage.js",
    }

    // global settings
    app.site.meta = {
        description : '',
        keywords : '',
        viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
        encoding : "utf-8"
    }

}