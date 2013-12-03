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
            html: "jade",
            css: "stylus",
        },
        prettify : {
            html : true,
        },
        jsonp : true,
        secret : 'MYAPPSECRET',
        protocol : 'http://'
    }

    // global settings
    app.site = {
        name : "site-name",
    }

    // global settings
    app.site.meta = {
        description : '',
        keywords : '',
        viewport : 'width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
        encoding : "utf-8"
    }

}