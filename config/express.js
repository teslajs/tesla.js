/**
 * Module dependencies.
 */
var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    helpers = require('view-helpers'),
    stylus = require('stylus'),
    fs = require('fs');

module.exports = function(app, db) {

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
    app.use(require(app.config.engines.css).middleware('./public')); // Set CSS Processor

    //Setting the fav icon and static folder
    app.use(express.favicon());
    app.use(express.static(app.config.root + '/public'));

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
        app.use(express.session({
            secret: app.config.secret,
            store: new mongoStore({
                db: db.connection.db,
                collection: 'sessions'
            })
        }));

        //connect flash for flash messages
        app.use(flash());

        //dynamic helpers
        app.use(helpers(app.name));

        //routes should be at the last
        app.use(app.router);

        //Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
        app.use(function(err, req, res, next) {
            //Treat as 404
            if (~err.message.indexOf('not found')) return next();

            //Log it
            console.error(err.stack);

            //Error page
            res.status(500).render('500', {
                error: err.stack
            });
        });

        //Assume 404 since no middleware responded
        app.use(function(req, res, next) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });

    });
};
