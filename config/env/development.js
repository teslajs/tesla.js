module.exports = function (app) {

    // global settings
    app.site.domain = "localhost";
    app.site.environment = "Development";
    app.site.url = app.config.protocol + app.site.domain + ':'  + app.config.port + '/'; // base url

    console.log(app.site.url);

    // directories
    app.site.dir = {
        css : app.site.url + "css/",
        img : app.site.url + "img/",
        lib : app.site.url + "lib/",
        js : app.site.url + "js/"
    };

    console.log( app.site.environment + ' config loaded' );

}