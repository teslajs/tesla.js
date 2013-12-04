module.exports = function (app) {

    // global settings
    app.site.domain = "staging.site-name.com";
    app.site.environment = "Staging";
    app.site.url = app.site.protocol + app.site.domain + '/'; // base url

    // directories
    app.site.dir = {
        js : app.site.url + "js/",
        img : app.site.url + "img/",
        css : app.site.url + "css/"
    };

    console.log( app.site.environment + ' config loaded' );

}