var app = {};

require('./config/_settings')(app);
require('./config/environment/development')(app);

var exit = require('gulp-exit'),
    gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglify'),
    mocha = require('gulp-mocha'),
    paths = {
      app: 'server.js',
      build : app.config.buildDir,
      css: app.config.publicDir + 'css/**/*',
      views: './app/views/**/*',
      img: app.config.publicDir + 'img/**/*',
      lib: app.config.publicDir + 'lib/**/*',
      js: [app.config.publicDir + 'js/**/*', 'app/**/*.js'],
    };


    // ONLY LOAD LIVE-RELOAD IF IT'S REQUIRED
    if ( app.config.liveReload.use === true ) {
      var livereload = require('gulp-livereload'),
          server = livereload(app.config.liveReload.port);
    }


  // CONDITIONAL REQUIREMENTS

  // STYLUS
  if ( app.config.engines.css === 'stylus' ) {
    var stylus = require('gulp-stylus');
  }

  // SASS
  if ( app.config.engines.css === 'sass' ) {

    /*
      setting gulp-ruby-sass as default for now
      gulp-ruby-sass is slower than gulp-sass, but supports Sass 3.3.
      gulp-sass is faster, but uses liblass which doesn't yet support Sass 3.2
    */

    var sass = require('gulp-ruby-sass');
    // var sass = require('gulp-sass');
  }

  // LESS
  if ( app.config.engines.css === 'less' ) {
    var less = require('gulp-less');
  }

  // JADE
  if ( app.config.engines.html === 'jade' ) {
    var jade = require('gulp-jade');
  }





// DEFAULT TASK TO PROECESS CSS, START THE SERVER & WATCH FOR CHANGES
gulp.task('default', ['nodemon', 'css', 'watch']);

// DEFAULT TASK TO PROECESS CSS & START THE SERVER
gulp.task('heroku', ['nodemon', 'css']);


// BUILD CSS
gulp.task('css', function () {

  // ONLY RUN IF CSS IS NOT PROCESSED VIA MIDDLEWARE
  if ( app.config.middleware.css === false ) {

    console.log('Running gulp task "CSS"');

    // SASS
    if ( app.config.engines.css === 'sass' ) {

      console.log('Compiling Sass');

      gulp.src('./public/css/*.scss')
          .pipe(sass({
            sourcemap: true
          }))
          .on('error', handleError)
          .pipe(gulp.dest( app.config.publicDir + 'css'));

    }

    // STYLUS
    if ( app.config.engines.css === 'stylus' ) {
      console.log('Compiling Stylus');
      gulp.src('./public/css/**/*.styl')
          .pipe(stylus())
          .pipe(gulp.dest( app.config.publicDir + 'css'));
    }

    // LESS
    if ( app.config.engines.css === 'less' ) {
      console.log('Compiling Less');
      gulp.src('./public/css/**/*.less')
          .pipe(less())
          .pipe(gulp.dest( app.config.publicDir + 'css'));
    }

  }

}); // END: CSS TASK



// MONITOR SERVER FOR CHANGES & RESTART
gulp.task('nodemon', function() {

  console.log('Running gulp task "NODEMON"');

  nodemon({
    script: paths.app,
    ext: 'js, ejs, hbs, jade, html, mustache, styl, less, scss',
    ignore: ['README.md', 'node_modules/**', '.DS_Store']
  })
  .on('change', ['css']);

}); // END: NODEMON TASK



// WATCH FILES FOR CHANGES
gulp.task('watch', function() {

  console.log('Running gulp task "WATCH"');

  // LIVE RELOAD
  if ( app.config.liveReload.use === true ) {

      // CSS
      gulp.watch(paths.css).on('change', function(file) {
           server.changed(file.path)}); // CSS
      gulp.watch(paths.img).on('change', function(file) {
           server.changed(file.path)}); // IMG

  }

}); // END: WATCH



// RUN TESTS
gulp.task('test', function() {

  gulp.src('test/server.js')
      .pipe(mocha({reporter: 'nyan'}))
      .pipe(exit());

});


// FOR NOW, THIS IS JUST HERE TO KEEP GULP FROM CRASHING WHEN SASS THROWS AN ERROR
function handleError() {
  // PLACEHOLDER FOR ACTUAL ERROR HANDLER
}
