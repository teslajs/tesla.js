var os = require('os');
    require('colors');

module.exports = function (app) {

  var tesla = require('../../lib/tesla')(app);

  // global settings
  app.site.domain = 'mydomain.com';
  app.site.environment = 'production';
  app.site.url = app.config.protocol + app.site.domain + '/'; // base url

  // directories
  app.site.dir = {
    css : app.site.url + 'css/',
    img : app.site.url + 'img/',
    lib : app.site.url + 'lib/',
    js : app.site.url + 'js/'
  };

  tesla.log('INFO:'.blue + ' ' + app.site.environment + ' config loaded' );

};
