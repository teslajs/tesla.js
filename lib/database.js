module.exports = function (app) {

	return {

		// SET DEFAULT SORTING
		options: function( opt ) {
	        var limit = 0,
	            orderBy = '_id',
	            order = 'desc',
	            offset = 0;

	        if ( opt.limit ) {
	            limit = opt.limit;
	        }

	        if ( opt.orderBy ) {
	            orderBy = opt.orderBy;
	        }

	        if ( opt.order ) {
	            order = opt.order;
	        }

	        if ( opt.offset ) {
	            offset = opt.offset;
	        }

	        order = order.toLowerCase();

	        if ( order === 'asc' || order === 'a-z' || order === 'az' ) {
	        	order = 'A';
	        } else if ( order === 'desc' || order === 'z-a' || order === 'za' ) {
	        	order = 'Z';
	        }

	        return {
	            limit : limit,
	            order : order,
	            orderBy : orderBy,
	            offset : offset
	        };

	    },

	    // ALLOW OVERRIDING SETTING WITH URI PARAMS
	    optionsUri: function( get ) {

	        var options = {};

	        if ( get.limit !== undefined ) {
				options.limit = parseInt(get.limit);
				console.log( 'override limit: ' + options.limit );
			}

			if ( get.order !== undefined ) {
				options.order = get.order;
				console.log( 'override order: ' + options.order );
			}

			if ( get.orderBy !== undefined ) {
				options.orderBy = get.orderBy;
				console.log( 'override orderBy: ' + options.orderBy );
			}

			if ( get.offset !== undefined ) {
				options.offset = get.offset;
				console.log( 'override offset: ' + options.offset );
			}

	        return options;

	    }
	};

};
