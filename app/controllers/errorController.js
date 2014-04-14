// GENERIC ERROR HANDLER
exports.throw = function(app, req, res) {

	if (app.err.status) {

		res.status(app.err.status).render('errors/default', {
			title : app.err.message,
			status: app.err.status,
			site: app.site
		});

	} else {
		res.status(500).render('error', {
			title : app.err,
			status: '500',
			site: app.site
		});
	}

};


// 404 ERROR
exports.throw404 = function(app, req, res) {

	res.status(404).render('errors/404', {
		title : app.err,
		url: req.originalUrl,
		error: app.err,
		site: app.site
	});

};


// 500 ERROR
exports.throw500 = function(app, req, res) {

	res.status(500).render('errors/500', {
		title : app.err.title,
		url: req.originalUrl,
		error: app.err.stack,
		site: app.site
	});

};