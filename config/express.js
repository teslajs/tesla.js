/**
 * Module dependencies.
 */
var express = require('express'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    minify = require('express-minify'),
    helpers = require('view-helpers'),
    tesla = require('../lib/tesla'),
    colors = require('colors'),
    fs = require('fs');

module.exports = function(app, tesla) {

    if ( app.config.engines.html === 'hogan' ) {
        var htmlEngine = require('hogan-middleware');
    } else if ( app.config.engines.html === 'mustache' ) {
        var htmlEngine = require('mustache-express');
    } else {
        var htmlEngine = require(app.config.engines.html);
    }

    // SHOW ERRORS IN DEV
    if (process.env.NODE_ENV === 'development') {
        app.set('showStackError', true);
    }

    //PRETTIFY HTML
    app.locals.pretty = app.config.prettify.html;

    if ( app.config.engines.css !== false ) {
        tesla.log('INFO:'.blue.blue + ' using ' + app.config.engines.css + ' as css preprocessor');
    } else {
        tesla.log('INFO:'.blue.blue + ' serving raw css (no pre-processor)');
    }

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

        app.use(stylus.middleware({
            src: app.config.root + '/public/',
            compile: compile
        }));

        app.use(express.static(app.config.root + '/public/'));


    // CUSTOM SETTINGS FOR SASS
    } else if ( app.config.engines.css === 'sass' ) {

        var sass = require('node-sass');

        app.use(sass.middleware({
            src: app.config.root + '/public/',
            dest: app.config.root + '/public/',
            debug: app.config.prettify.css
        }));

        app.use(express.static('./public'));

    // IF NOT USING STYLUS
    } else if ( app.config.engines.css === 'less' ) {

        var less = require('less-middleware');

        if ( app.config.prettify.css === true ) {
            var compress = false;
        } else {
            var compress = true;
        }

        app.use(less({
            src: app.config.root + '/public/',
            dest: app.config.root + '/public/',
            debug: true,
            compress: compress
        }));

        app.use(express.static('./public'));

    // IF NO PREPROCESSORS
    } else {
        app.use(express.static('./public'));
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

    if ( app.config.prettify.js === false ) {
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

    // FAVICON
    // app.use(favicon());

    // LOGGER
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));
    }

    // SET VIEWS DIR
    app.set('views', app.config.root + '/app/views');

    // SET JSONP
    if ( app.config.jsonp === true ) {
        app.enable("jsonp callback");
    }

    // app.configure(function() {

        // COOKIE PARSER (KEEP ABOVE SESSION)
        app.use(cookieParser());

        // SET HTML VIEW ENGINE
        if ( app.config.engines.html === 'hbs' ) {
            app.set('view engine', 'hbs');
            app.engine('html', require('hbs').__express);
            htmlEngine.registerPartials(app.config.root + '/app/views/partials');
        } else if ( app.config.engines.html === 'hogan' ) {
            app.engine('mustache', require('hogan-middleware').__express);
            app.set('view engine', 'mustache');
        } else if ( app.config.engines.html === 'mustache' ) {
            app.engine('mustache', htmlEngine());
            app.set('view engine', 'mustache');
        } else {
            app.set('view engine', app.config.engines.html);
        }

        tesla.log('INFO:'.blue.blue + ' using ' + app.config.engines.html + ' as view engine');

        app.use(bodyParser()); // KEEP ABOVE METHOD OVERRIDE
        app.use(methodOverride());

        // VIEW HELPERS
        app.use(helpers(app.name));

        // app.use(app.router);

        //Assume "not found" if the error msg is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.


    // });
};
