
// HELLO/WORLD
exports.world = function(app) {

	model = require('../../models/user')(app);

	// app.res.render('hello/world', {
	// 	title : app.site.name + ' - Hello World',
	// 	site: app.site
 //    });

	model.find('{surname: "Doe"}', function(result) {
		console.log('finished');

		result.forEach(function(item) {
			console.log( item.name );
		})

		// console.log(result);
	});


};