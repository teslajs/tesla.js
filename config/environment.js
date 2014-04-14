var _ = require('underscore');

// Load app configuration
module.exports = _.extend( require(__dirname + '/../config/environment/' + process.env.NODE_ENV + '.js') || {} );
