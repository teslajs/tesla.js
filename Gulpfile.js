var app = {};

require('./config/_settings')(app);
require('./config/environment/development')(app);

var browserSync = require('browser-sync'),
    exit        = require('gulp-exit'),
    gulp        = require('gulp'),
    gulpIgnore  = require('gulp-ignore'),
    karma       = require('karma').server,
    minifyCSS   = require('gulp-minify-css'),
    nodemon     = require('gulp-nodemon'),
    reload      = browserSync.reload,
    uglify      = require('gulp-uglifyjs'),
    paths       = {
      app   : 'server.js',
      build : app.config.system.build,
      css   : app.config.system.public + 'css/**/*.css',
      img   : app.config.system.public + 'img/**/*',
      js    : [app.config.system.public + 'js/**/*', 'app/**/*.js'],
      less  : app.config.system.public + 'css/**/*.less',
      lib   : app.config.system.public + 'lib/**/*'
    };


// DEFAULT TASK, HANDLES ALL BASIC SERVER STUFF
gulp.task('default', ['bs'], function () {

  // gulp.watch(paths.less, ['css'] );
  gulp.watch(paths.js, [reload]);
  // gulp.watch(paths.img);

});

// DEV TASK, SAME AS DEFAULT + UNIT TESTS
gulp.task('dev', ['default', 'bs'], function (done) {

  // RUN UNIT TESTS ANY TIME JS FILES CHANGE - karma.conf.js
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);

});



// BROWSER SYNC
gulp.task('bs', ['nodemon'], function() {

  if ( app.config.browserSync ) {
    console.log('Running gulp task "BS"');

    browserSync.init(null, {
      proxy: 'http://localhost:' + app.config.server.port,
      files: app.config.browserSync.files,
      open: app.config.browserSync.open,
      port: app.config.browserSync.port,
      notify: app.config.browserSync.notify
    });
  }

});



// BUILD TASK TO MINIFY & CONCAT PRODUCTIONS FILES
gulp.task('build', function () {

  console.log('Running gulp task "BUILD"');

  // CONCAT + MINIFY JS
  gulp.src([app.config.system.public + 'js/**/*.js', '!' + app.config.system.public + 'js/style-guide.js'])
    .pipe(uglify('zebra.min.js'))
    .pipe(gulp.dest(app.config.system.public + '_dist/'));

  // MINIFY CSS
  gulp.src(app.config.system.public + 'css/zebra.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(app.config.system.public + '_dist/'))
    .pipe(exit());


}); // END: BUILD TASK




// RUN ALL UNIT TESTS ONCE & EXIT
gulp.task('test', function(done) {

  process.env.CHROME_BIN = '/Applications/Internet/Google Chrome.app/Contents/MacOS/Google Chrome';

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);

});



// NODEMON
gulp.task('nodemon', function (cb) {
  var called = false;
	return nodemon({
	  script: paths.app,
    ext: 'js, hbs, less',
    ignore: ['README.md', 'node_modules/**', '.DS_Store']
	}).on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});
