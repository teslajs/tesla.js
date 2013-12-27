module.exports = function (app) {

	return {

		// ALLOW TESLA LOGGING TO BE TURNED OFF IN CONFIG
		log: function(what) {
			if ( app.config.logging.console === true ) console.log(what);
		},

		emptyObject: function(obj) {
		  return !Object.keys(obj).length;
		},

		countObject: function(obj) {
			var count = 0;
			for( key in obj ) {
			  if(obj(key)) {
			    count++;
			  }
			}

			return count;
		}

	}

};