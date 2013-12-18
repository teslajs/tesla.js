var colors = require('colors');

module.exports = function (app) {

    var tesla = require('../../tesla_modules/tesla')(app);

    // global settings
    app.site.domain = "test.site-name.com";
    app.site.environment = "Test";
    app.site.url = app.site.protocol + app.site.domain + '/'; // base url

    // directories
    app.site.dir = {
        js : app.site.url + "js/",
        img : app.site.url + "img/",
        css : app.site.url + "css/"
    };

    tesla.log( 'INFO:'.blue + ' ' + app.site.environment + ' config loaded' );

}