module.exports = function (app, req) {

	return {

		segment: function(i) {
			var uri = req.url.split('?');
		    return uri[0].split('/');
		}

	}

};