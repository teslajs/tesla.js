module.exports = function (app) {

  var orm = require('orm'),
      tesla = require('../../lib/tesla')(app),
      teslaDB = require('../../lib/database')(app),
      colors = require('colors'),
      db  = orm.connect(app.config.db.url);

  orm.settings.set('instance.returnAllErrors', true);

  // DEFINE MODEL SCHEMA
  // Be sure to add some files to the schema below or you will not have success quering or adding to the database
  var Model = db.define('{model}', {
      created   : { type: 'date', time: true },
      updated   : { type: 'date', time: true }
      // _id : { type: 'text' },
      // name      : { type: 'text', required: true },
      // isAdmin : { type: 'boolean', defaultValue: false },
  }, {
      validations: {
        // EXAMPLE VALIDATIONS
        // password: orm.enforce.security.password('luns5', 'Passowrd does not meet min security requirements.'),
        // email: orm.enforce.patterns.email('Please enter a valid email address.')
        // More Options : https://github.com/dresende/node-enforce
      }
  });



  return {

    // FIND ALL ITEMS
    all : function ( options, cb ) {

      var msg, returnData,
          opt = teslaDB.options ( options );

      db.on('connect', function (err) {

        // IF WE CONNECT SUCESFULLY
        if (!err) {

          Model.find('', opt.limit, [ opt.orderBy, opt.order ], function (err, result) {

            if ( !err ) {

              returnData = {
                status : 'success',
                msg : result.length + ' results found.',
                data : result
              };

            } else {

              returnData = {
                status : 'error',
                msg : 'Error querying database.',
                data : err
              };

            }

            return cb(returnData);

          });

        // IF WE FAIL TO GET A CONNECTION
        } else {

          console.log(err);

          if ( err.errmsg ) {
            msg = err.name + ': ' + err.errmsg + ' - code: ' + err.code;
          } else {
            msg = 'Error connecting to the database.';
          }

          returnData = {
            status : 'error',
            msg : msg,
            data : err
          };

          return cb(returnData);

        }

      });

    }, // END ALL

    // CREATE ITEM(S)
    create : function ( data, cb ) {

      var msg, returnData;

      data.created = new Date().toJSON();
      data.updated = new Date().toJSON();

      db.on('connect', function (err) {

        // IF WE FAIL TO GET A CONNECTION
        if (err) {
          console.log('Error connecting to the database.', err);
          return;

        // IF WE CONNECT SUCESFULLY
        } else {

          console.log('connected to: ' + app.config.db.url);

          Model.create( data, function (err, result) {

            if (err) {

              if ( err.msg !== undefined) {
                msg = 'Invalid or missing value for ' + err.property + ' field (' + err.value + ') - Message: ' + err.msg;
              } else {
                msg = err;
              }

              returnData = {
                status : 'error',
                msg : msg,
                data : err
              };

              return cb(returnData);

            } else {

              returnData = {
                status : 'success',
                data : result
              };

              return cb(returnData);

            }
          });

        }

      });

    }, // END CREATE


    // DELETE (ONLY WORKS WITH SPECIFIC ID FOR NOW)
    delete : function( query, cb ) {

      db.on('connect', function (err) {

        var msg, returnData;

        // IF WE CONNECT SUCESFULLY
        if (!err) {

          Model.find( query ).remove(function (err) {

            // IF WE SUCCEEDED
            if (!err) {

              returnData = {
                status : 'success',
                msg : 'Item removed.'
              };

            // IF WE FAILED
            } else {

              returnData = {
                status : 'error',
                msg : msg,
                data : err
              };

            }

            return cb(returnData);

          });

        // IF WE FAIL TO GET A CONNECTION
        } else {

          returnData = {
            status : 'error',
            msg : 'Error connecting to the database.',
            data : err
          };

          return cb(returnData);

        }

      });

    }, // END DELETE

    // QUERY FOR MATCHING ITEM(S)
    find : function ( query, options, cb ) {

      var msg, returnData,
          self = this,
          opt = teslaDB.options ( options );

      db.on('connect', function (err) {

        // IF WE CONNECT SUCESFULLY
        if (!err) {

          Model.find(query, opt, function (err, result) {

              if ( !err ) {

                returnData = {
                  status : 'success',
                  msg : result.length + ' results found.',
                  data : result
                };

              } else {

                returnData = {
                  status : 'error',
                  msg : 'Error querying database.',
                  data : err
                };

              }

              return cb(returnData);

          });

        // IF WE FAIL TO GET A CONNECTION
        } else {

          returnData = {
            status : 'error',
            msg : 'Error connecting to the database.',
            data : err
          };

          return cb(returnData);

        }


      });

    }, // END FIND

    // UPDATE (ONLY WORKS WITH SPECIFIC ID FOR NOW)
    update : function( _id, updateData, cb ) {

      var returnData;

      updateData.updated = new Date().toJSON();

      db.on('connect', function (err) {

        // IF WE CONNECT SUCESFULLY
        if (!err) {

          console.log('find id: ' + _id);

          Model.get(_id, function (err, result) {

            returnData = {
              status : 'success',
              msg : 'Record successfully updated.',
              data : result
            };

            result.save(updateData, function (err) {
                return cb(returnData);
            });

          });

        // IF WE FAIL TO GET A CONNECTION
        } else {

          console.log('error');

          returnData = {
            status : 'error',
            msg : 'Error connecting to the database.',
            data : err
          };

          return cb(returnData);

        }

      });

    }, // END update
    
  };

};
