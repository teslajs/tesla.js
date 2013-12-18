exports.render = function(app) {

	var mongoose = require('mongoose'),
    Model = mongoose.model( app.model ),
    _ = require('underscore');

    Model.findOne({name: app.action}).exec(function(err, data) {

    	console.log('collection: ' + app.controller);
    	console.log('name: ' + app.action);
        console.log(data);

        // IF WE GET AN ERROR
        if (err) {
            app.res.render('error', {
                status: 500
            });

        // IF NO DATA WAS RETURNED, THROW A 404
        } else if ( data === null) {
            app.res.status(404).render('404', {
                title : app.site.name + ' - Not Found',
                url: app.req.originalUrl,
                error: 'Not found',
                site: app.site
            });

        // IF NO PROBLEMS, RENDER PAGE
        } else {

    		app.res.render('default', {
				page : data,
				site: app.site
		    });

         // app.res.send('done');

        }
    });
};
