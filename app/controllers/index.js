exports.render = function(req, res, app) {

	res.render('index', {
		pageTitle : app.site.name,
		site: app.site
    });

};
