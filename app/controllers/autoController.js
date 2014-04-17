exports.render = function(app,view) {

  var colors = require('colors'),
      tesla = require('../../lib/tesla')(app);

  tesla.log('SUCCESS: '.green + 'app/views/'.yellow + view.yellow + ' has been loaded');

  app.res.render(view, {
      title : app.site.name,
      site: app.site
  });

};
