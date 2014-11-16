module.exports = function( app, res, res ) {

	res.render('index', {
		title : app.site.name,
		site: app.site
	});

};
