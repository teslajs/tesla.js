exports.render = function(app) {

	app.res.render('default', {
		pageTitle : app.site.name,
		site: app.site
    });

};