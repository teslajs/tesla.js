exports.render = function(app,view) {

    app.res.render(view, {
        title : app.site.name + ' - Hello World',
        site: app.site
    });

};
