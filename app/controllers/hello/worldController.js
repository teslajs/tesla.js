// HELLO/WORLD
module.exports = function(app, req, res) {

	res.render('hello/world', {
		title : app.site.name + ' - Hello World',
		site: app.site
    });

};