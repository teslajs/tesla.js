exports.index = function(app) {

	app.res.render('default', {
		title : app.site.name,
		site: app.site
    });

};