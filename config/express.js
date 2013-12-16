/**
 * Module dependencies.
 */
var express = require('express'),
    minify = require('express-minify'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    helpers = require('view-helpers'),
    fs = require('fs');

module.exports = function(app) {

    var htmlEngine = require(app.config.engines.html);

    app.set('showStackError', true);

    //Prettify HTML
    app.locals.pretty = app.config.prettify.html;

    //Should be placed before express.static
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    console.log('using ' + app.config.engines.css + ' as css preprocessor');

    // CUSTOM SETTINGS FOR STYLUS
    if ( app.config.engines.css === 'stylus' ) {

        var stylus = require('stylus');

        if ( app.config.prettify.css === true ) {
            var compress = false;
        } else {
            var compress = true;
        }

        // USE NIB
        if ( app.config.engines.cssLibrary === 'nib') {

            var nib = require('nib');

            function compile(str, path) {

              return stylus(str)
                .set('filename', path)
                .set('compress', compress)
                .use(nib());
            }



        // USE AXIS
        } else if ( app.config.engines.cssLibrary === 'axis') {

            var axis = require('axis-css');

            function compile(str, path) {

                console.log(path);

              return stylus(str)
                .set('filename', path)
                .set('compress', compress)
                .use(axis());
            }


        } else {
            function compile(str, path) {
              return stylus(str)
                .set('filename', path)
                .set('compress', compress);
            }
        }

        console.log('css dir: '  + app.config.root + '/public/');

        app.use(stylus.middleware({
            src: app.config.root + '/public/',
            compile: compile
        }));


    // IF NOT USING STYLUS
    } else {
        app.use(require(app.config.engines.css).middleware(app.config.root + '/public/')); // Set CSS Processor
    }


    // MINIFY


    if ( app.config.prettify.css === false ) {
        min_css = /css/;
        min_less = /css/;
        min_sass = /css/;
        min_stylus = /css/;
    } else {
        min_css = /donothinghere/;
        min_less = /donothinghere/;
        min_sass = /donothinghere/;
        min_stylus = /donothinghere/;
    }

    if ( app.config.prettify.css === false ) {
        min_js = /js/;
    } else {
        min_js = /donothinghere/;
    }

    app.use(minify( {
        js_match: min_js,
        css_match: min_css,
        sass_match: min_sass,
        less_match: min_less,
        stylus_match: min_stylus,
        coffee_match: /coffeescript/,
        cache: app.config.cache,
        blacklist: [/\.min\.(css|js)$/],
        whitelist: null
    }));

    //Setting the fav icon and static folder
    app.use(express.favicon());
    app.use(express.static('./public'));

    //Don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(express.logger('dev'));
    }

    //Set views path, template engine and default layout
    app.set('views', app.config.root + '/app/views');

    //Enable jsonp
    if ( app.config.jsonp === true ) {
        app.enable("jsonp callback");
    }

    app.configure(function() {

        //cookieParser should be above session
        app.use(express.cookieParser());

        app.set('view engine', app.config.engines.html); // set html view engine
        console.log('using ' + app.config.engines.html + ' as view engine');

        // request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        //express/mongo session storage
        // app.use(express.session({
        //     secret: app.config.secret,
        //     store: new mongoStore({
        //         db: db.connection.db,
        //         collection: 'sessions'
        //     })
        // }));

        //connect flash for flash messages
        // app.use(flash());

        //dynamic helpers
        app.use(helpers(app.name));

        //routes should be at the last
        app.use(app.router);

        //Assume "not found" if the error msg is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
        app.use(function(err, req, res, next) {
            //Treat as 404
            if (~err.message.indexOf('not found')) return next();

            //Log it
            console.error(err.stack);

            //Error page
            res.status(500).render('500', {
                error: err.stack,
                title : app.site.name + ' - Error!',
                site: app.site
            });
        });

        //Assume 404 since no middleware responded
        app.use(function(req, res, next) {
            res.status(404).render('404', {
                title : app.site.name + ' - Not Found',
                url: req.originalUrl,
                error: 'Not found',
                site: app.site
            });
        });

    });
};
