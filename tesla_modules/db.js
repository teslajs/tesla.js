module.exports = function (app) {

	return {

		options: function( opt ) {
	        var limit = 0,
	            orderBy = '_id',
	            order = "A",
	            offset = 0;

	        if ( opt.limit ) {
	            limit = opt.limit
	        }

	        if ( opt.orderBy ) {
	            orderBy = opt.orderBy
	        }

	        if ( opt.order ) {
	            order = opt.order
	        }

	        if ( opt.offset ) {
	            offset = opt.offset
	        }

	        order = order.toLowerCase();

	        if ( order === "asc" || order === "a-z" || order === "az" ) {
	        	order = "A";
	        } else if ( order === "desc" || order === "z-a" || order === "za" ) {
	        	order = "Z";
	        }

	        return {
	            limit : limit,
	            order : order,
	            orderBy : orderBy,
	            offset : offset
	        }

	    }
	}

};