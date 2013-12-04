/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

exports.render = function(req, res, app) {

	res.render('hello/world', {
		pageTitle : app.site.name + ' - Hello World',
		site: app.site
    });

};
