module.exports = function(app) {

    // Default Route
    var index = require('../app/controllers/index');

    app.get('/', function(req, res){
		index.render(req, res, app);
	});


    // Hello World
    var helloWorld = require('../app/controllers/hello/world');

	app.get('/hello/world', function(req, res){
		helloWorld.render(req, res, app);
	});

};
