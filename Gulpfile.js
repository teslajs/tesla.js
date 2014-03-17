var app = {},
  cfg = require('./config/config')(app),gulp = require('gulp'),
  jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
  lr = require('tiny-lr'),
	nodemon = require('gulp-nodemon'),
  server = livereload(app.config.liveReload.port),
  paths = {
  	app: 'server.js',
    css: 'public/css/**/*',
    img: 'public/img/**/*',
    js: ['public/js/**/*', 'app/**/*.js']
  };


gulp.task('default', ['nodemon', 'watch']);

// WATCH FILES FOR CHANGES + LIVERELOAD
gulp.task('watch', function() {

  if ( app.config.liveReload === true ) {
    gulp.watch(paths.css).on('change', function(file) {
      server.changed(file.path);
    });

    gulp.watch(paths.img).on('change', function(file) {
      server.changed(file.path);
    });

    gulp.watch(paths.js).on('change', function(file) {
      server.changed(file.path);
    });
  }

});


// MONITOR SERVER FOR CHANGES
gulp.task('nodemon', function() {

  nodemon({
    script: paths.app,
    ext: 'js, hbs, jade, html, mustache',
    ignore: ['README.md', 'node_modules/**', '.DS_Store']
  })
  .on('change', ['lint'])
  .on('restart', function () {
    console.log('restarted!')
  });

});