module.exports = function (app) {

	return {

		// ALLOW TESLA LOGGING TO BE TURNED OFF IN CONFIG
		log: function(what) {
			if ( app.config.logging.console === true ) console.log(what);
		}
	}

};