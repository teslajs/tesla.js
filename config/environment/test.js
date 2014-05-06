var colors = require('colors'),
  os = require('os');

module.exports = function (app) {

  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (k in interfaces) {
    for (k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family == 'IPv4' && !address.internal) {
        addresses.push(address.address)
      }
    }
  }

  var tesla = require('../../lib/tesla')(app);

  if ( typeof addresses[0] === 'undefined' ) addresses[0] = 'localhost'

  // global settings
  app.site.domain = addresses[0];
  app.site.environment = "test";
  app.site.url = app.config.protocol + app.site.domain + '/'; // base url

  // directories
  app.site.dir = {
    css : app.site.url + "css/",
    img : app.site.url + "img/",
    lib : app.site.url + "lib/",
    js : app.site.url + "js/"
  };

  tesla.log('INFO:'.blue + ' ' + app.site.environment + ' config loaded' );

}