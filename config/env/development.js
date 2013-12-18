var  colors = require('colors');

module.exports = function (app) {

    var tesla = require('../../tesla_modules/tesla')(app);

    // global settings
    app.site.domain = "localhost";
    app.site.environment = "Development";
    app.site.url = app.config.protocol + app.site.domain + ':'  + app.config.port + '/'; // base url

    // directories
    app.site.dir = {
        css : app.site.url + "css/",
        img : app.site.url + "img/",
        lib : app.site.url + "lib/",
        js : app.site.url + "js/"
    };

    tesla.log('INFO:'.blue + ' ' + app.site.environment + ' config loaded' );

}