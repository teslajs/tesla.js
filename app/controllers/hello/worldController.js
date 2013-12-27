
// HELLO/WORLD
exports.world = function(app) {

	app.res.render('hello/world', {
		title : app.site.name + ' - Hello World',
		site: app.site
    });

};