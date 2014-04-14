var app = {},
  cfg = require('./config/_settings')(app),gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  nodemon = require('gulp-nodemon'),
  server = livereload(app.config.liveReload.port),
  paths = {
    app: 'server.js',
    css: './public/css/**/*',
    html: './public/views/**',
    img: './public/img/**/*',
    js: ['./public/js/**/*', 'app/**/*.js'],
    views: './app/**/*'
  };


// DEFAULT TASK
gulp.task('default', ['nodemon', 'watch']);


// WATCH FILES FOR CHANGES
gulp.task('watch', function() {

  // LIVE RELOAD
  if ( app.config.liveReload.use === true ) {

    // ASSETS
    gulp.watch(paths.css).on('change', function(file) {
      server.changed(file.path);
    });

    gulp.watch(paths.img).on('change', function(file) {
      server.changed(file.path);
    });

    gulp.watch(paths.js).on('change', function(file) {
      server.changed(file.path);
    });


    // VIEWS
    if ( app.config.engines.html === 'jade' ) {
      gulp.watch(paths.views + '.jade').on('change', function(file) { server.changed(file.path); });
    }
    if ( app.config.engines.html === 'ejs' ) {
      gulp.watch(paths.views + '.ejs').on('change', function(file) { server.changed(file.path); });
    }
    if ( app.config.engines.html === 'hbs' ) {
      gulp.watch(paths.views + '.hbs').on('change', function(file) { server.changed(file.path); });
    }
    if ( app.config.engines.html === 'hogan' || app.config.engines.html === 'mustache' ) {
      gulp.watch(paths.views + '.mustache').on('change', function(file) { server.changed(file.path); });
    }


  }

});


// MONITOR SERVER FOR CHANGES & RESTART
gulp.task('nodemon', function() {

  nodemon({
    script: paths.app,
    ext: 'js, ejs, hbs, jade, html, mustache, styl, less, scss',
    ignore: ['README.md', 'node_modules/**', '.DS_Store']
  })
  .on('restart', function () {
      livereload(); // REFRESH BROWSER ON RESET
    })

});