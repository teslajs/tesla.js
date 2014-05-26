module.exports = function (app) {

  var controllers = '../../../app/controllers/',
      tesla = require('../../../lib/tesla')(app);

  app.get('*', function(req, res, next){
    next( tesla.throw(404) );
  });

  app.use(function(err, req, res, next){

    app.err = err;

    // SPECIAL VIEW FOR 404
    if ( err.status && err.status === 404 || err.code === 'MODULE_NOT_FOUND' ) {

      if ( err.code === 'MODULE_NOT_FOUND' ) {
        tesla.log( ' ');
        tesla.log( 'ERROR:'.red + ' all attempts to be rational have failed...');
        console.log(err);
      } else {
        tesla.log( 'ERROR:'.red + ' all attempts to be rational have failed. throwing 404.');
      }

      require(controllers + 'errorController').throw404(app, req, res);
    } else if ( err.status ) {
      require(controllers + 'errorController').throw(app, req, res);
    } else {
      app.err.status = 500;
      app.err.message = err;
      console.log( JSON.stringify(err));
      app.err.title = '500 Internal Server Error';
      require(controllers + 'errorController').throw500(app, req, res);
    }

  });

};
