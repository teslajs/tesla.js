exports.index = function(app) {

	app.res.render('index', {
		title : app.site.name,
		site: app.site
    });

};