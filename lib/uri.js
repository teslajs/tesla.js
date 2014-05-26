module.exports = function (app, req) {

	return {

		// return specific uri segment
		segment: function(i) {
			var uri = req.url.split('?');
		    uri = uri[0].split('/');
		    return uri[i];
		},

		// return full url
		full: function() {
			return req.url;
		},

		rest: function() {
			var ctrl, id, model, action,
		    	uri = req.url.split('?');
			    uri = uri[0].split('/');
			    ctrl = uri[1];
			    model = ctrl;
			    action = uri[2];
			    id = uri[3];

			return {
				controller: ctrl,
				action: action,
				id: id
			};
		},

		action: function() {
			if ( this.rest().action !== undefined ) {
				return this.rest().action;
			} else {
				return '';
			}
		},

		controller: function() {

			if ( this.rest().controller !== undefined ) {
				return this.rest().controller;
			} else {
				return 'index';
			}

		},

		id: function() {
			if ( this.rest().id !== undefined ) {
				return this.rest().id;
			} else {
				return '';
			}
		},

		get: function(which) {
			return req.query[which];
		}

	};

};
