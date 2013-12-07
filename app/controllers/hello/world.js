exports.render = function(app) {

	app.res.render('hello/world', {
		pageTitle : app.site.name + ' - Hello World',
		site: app.site
    });

};