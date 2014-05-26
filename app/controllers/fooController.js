
// HELLO/WORLD
module.exports = function(app) {

	var tesla = require('../../lib/tesla.js')(app);

	app.route('/foo/bar')

		.get(function(req, res, next) {
			res.send('Foo bar.');
		})
		.post(function(req, res, next) {
			res.render('POST is not allowed');
		});


	app.route('/foo/baz')

		.get(function(req, res, next) {
			res.send('Foo baz.');
		})
		.post(function(req, res, next) {
			res.render('POST is not allowed');
		});


	// THROS 404 IF BAR & BAZ FAIL
	app.get('/foo/*', function(req, res, next){
    next( tesla.throw(404) );
	});

};
