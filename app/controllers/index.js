exports.render = function(req, res, app) {

	res.render('index', {
		pageTitle : 'Cage.js',
		site: app.site
    });

};
