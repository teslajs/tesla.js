// LIST ALL ITEMS
exports.all = function(app) {

	var model = require('../models/{model}')(app);

	model.all( function(result) {

		if (result.status === 'success') {

			if ( app.config.api.enabled === true  &&  app.config.api.format === 'json' ) {

				app.res.send( JSON.stringify( result.data ) );

			} else {
		        app.res.render('{model}s/all', {
					title : app.site.name,
					site : app.site,
					url : app.site.url + '{model}/find/' + result.data._id,
					data : result.data
			    });
		    }


		} else {
			// Error page
	        app.res.status(500).render('500', {
	            error: result.msg,
	            title : app.site.name + ' - Error!',
	            site: app.site
	        });
	        // app.res.send( result.data );
		}

	});

};


// LIST ALL ITEMS
exports.create = function(app) {

	var model = require('../models/{model}')(app),
		data = app.req.query;

	model.create( data, function(result) {

		if (result.status === 'success') {

			if ( app.config.api.enabled === true  &&  app.config.api.format === 'json' ) {

				app.res.send( JSON.stringify( result.data ) );

			} else {
		        app.res.render('{model}s/create/success', {
					title : app.site.name,
					site : app.site,
					url : app.site.url + '{model}/find/' + result.data._id,
					data : result.data
			    });
		    }


		} else {
			// Error page
	        app.res.status(500).render('500', {
	            error: result.msg,
	            title : app.site.name + ' - Error!',
	            site: app.site
	        });
	        // app.res.send( result.data );
		}

	});

};


// DELETE ITEM
exports.delete = function(app) {

	var model = require('../models/{model}')(app),
		uri = require('../../lib/uri')(app, app.req),
		data = app.req.query;

	model.delete( uri.segment(3), uri.segment(4), function(result) {
		if (result.status === 'success') {

			if ( app.config.api.enabled === true  &&  app.config.api.format === 'json' ) {

				app.res.send( JSON.stringify( result.data ) );

			} else {
		        app.res.render('{model}s/create/success', {
					title : app.site.name,
					site : app.site,
					url : app.site.url + '{model}/delete/' + result.data._id,
					data : result.data
			    });
		    }


		} else {
			// Error page
	        app.res.status(500).render('500', {
	            error: result.msg,
	            title : app.site.name + ' - Error!',
	            site: app.site
	        });
	        // app.res.send( result.data );
		}
	});


}; // END DELETE


// QUERY ITEMS
exports.find = function(app) {

	var model = require('../models/{model}')(app),
		uri = require('../../lib/uri')(app, app.req),
		data = app.req.query;

	model.find( uri.segment(3), uri.segment(4), function(result) {
		if (result.status === 'success') {

			if ( app.config.api.enabled === true  &&  app.config.api.format === 'json' ) {

				app.res.send( JSON.stringify( result.data ) );

			} else {
		        app.res.render('{model}s/create/success', {
					title : app.site.name,
					site : app.site,
					url : app.site.url + '{model}/find/' + result.data._id,
					data : result.data
			    });
		    }


		} else {
			// Error page
	        app.res.status(500).render('500', {
	            error: result.msg,
	            title : app.site.name + ' - Error!',
	            site: app.site
	        });
	        // app.res.send( result.data );
		}
	});


}; // END UPDATE


// UPDATE ITEM (ONLY WORKS WITH A SPECIFIC ID FOR NOW)
exports.update = function(app) {

}; // END UPDATE
