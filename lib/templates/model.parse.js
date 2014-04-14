module.exports = function (app) {

    var tesla = require('../../lib/tesla')(app),
        teslaDB = require('../../lib/database')(app),
        colors = require('colors'),
        Parse = require('parse').Parse
        collection = '{model}';

        Parse.initialize(app.config.parse.app_id, app.config.parse.js_key);

        var DB = Parse.Object.extend(collection),
            query = new Parse.Query(DB);

    return {

        // FIND ALL ITEMS
        all : function ( cb ) {

            query.find({
                success: function(response) {

                    if ( response.length > 0 ) {

                        tesla.log('SUCCESS: '.green);
                        tesla.log(response);

                        var returnData = {
                            status : 'success',
                            msg : response.length + ' results found.',
                            data : response
                        };

                    } else {

                        console.log( 'results: ' + response.results.length );
                        tesla.log('EMPTY: '.yellow);
                        tesla.log(response);

                        var returnData = {
                            status : 'empty',
                            msg : 'No results found.',
                            data : response
                        };

                    }

                    return cb( returnData );

                },

                error: function(err) {

                    tesla.log('ERROR: '.red + err.msg.red);
                    console.log(err);

                    var returnData = {
                        status : 'error',
                        msg : 'Error: ' + err.code + ' ' + err.message,
                        data : err
                    };

                    return cb( returnData );
                }

            });


        }, // END ALL

        // CREATE ITEM(S)
        create : function ( data, cb ) {

            var DB = Parse.Object.extend(collection);
            var db = new DB();

            db.set("name", data.name);
            db.set("email", data.email);

            db.save(null, {
                success: function(response) {

                    tesla.log('SUCCESS: '.green);
                    tesla.log(response);

                    var returnData = {
                        status : 'success',
                        msg : response.length + ' results found.',
                        data : response
                    };

                    return cb( returnData );

                },

                error: function(response, err) {

                    tesla.log('ERROR: '.red + err.msg.red);
                    console.log(err);

                    var returnData = {
                        status : 'error',
                        msg : 'Error: ' + err.code + ' ' + err.message,
                        data : err
                    };

                    return cb( returnData );
                }
            });

        }, // END CREATE


        // DELETE (ONLY WORKS WITH SPECIFIC ID FOR NOW)
        delete : function( query, cb ) {

        }, // END DELETE

        // QUERY FOR MATCHING ITEM(S)
        find : function ( key, operation, value, cb ) {

            query.equalTo(key, value);

            query.find({

                success: function(response) {

                    if ( response.length > 0 ) {

                        tesla.log('SUCCESS: '.green);
                        tesla.log(response);

                        var returnData = {
                            status : 'success',
                            msg : response.length + ' results found.',
                            data : response
                        };

                    } else {

                        console.log( 'results: ' + response.results.length );
                        tesla.log('EMPTY: '.yellow);
                        tesla.log(response);

                        var returnData = {
                            status : 'empty',
                            msg : 'No results found.',
                            data : response
                        };

                    }

                    return cb( returnData );

                },

                error: function(err) {

                    tesla.log('ERROR: '.red + err.msg.red);
                    console.log(err);

                    var returnData = {
                        status : 'error',
                        msg : 'Error: ' + err.code + ' ' + err.message,
                        data : err
                    };

                    return cb( returnData );
                }

            });


        }, // END FIND

        // UPDATE RECORD
        update : function( _id, updateData, cb ) {

        }, // END UPDATE
    }

};