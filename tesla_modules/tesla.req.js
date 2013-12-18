module.exports = function (app, req) {

	app.blah = 'blah blah app';
	app.req = req.url;
	app.test = 'test 1, 2, 3.'

	return {
		foo: function() {
			return 'bar';
		}
	}

};


// module.exports.uri = function () {
//   console.log(app.req);
// };