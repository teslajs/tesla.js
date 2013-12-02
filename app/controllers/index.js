/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	curl = require('curlrequest'),
	request = require('request'),
	rest = require('rest'),
	superagent = require('superagent'),
	Client = require('node-rest-client').Client;

exports.render = function(req, res) {

	res.render('index', {
		title : 'Banj.in'
    });

};
