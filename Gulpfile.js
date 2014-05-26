var app = {};

require('./config/_settings')(app);
require('./config/environment/development')(app);

var exit = require('gulp-exit'),
    gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglify'),
    server = livereload(app.config.liveReload.port),
    paths = {
      app: 'server.js',
      build : app.config.buildDir,
      css: app.config.publicDir + 'css/**/*',
      views: './app/views/**/*',
      img: app.config.publicDir + 'img/**/*',
      lib: app.config.publicDir + 'lib/**/*',
      js: [app.config.publicDir + 'js/**/*', 'app/**/*.js'],
    };


  // CONDITIONAL REQUIREMENTS

  // STYLUS
  if ( app.config.engines.css === 'stylus' ) {
    var stylus = require('gulp-stylus');
  }

  // SASS
  if ( app.config.engines.css === 'sass' ) {
    var sass = require('gulp-sass');
  }

  // LESS
  if ( app.config.engines.css === 'less' ) {
    var less = require('gulp-less');
  }

  // JADE
  if ( app.config.engines.html === 'jade' ) {
    var jade = require('gulp-jade');
  }




// DEFAULT TASK
gulp.task('default', ['nodemon', 'css', 'watch']);


// HEROKU TASK
gulp.task('heroku', ['nodemon', 'css']);




// WATCH FILES FOR CHANGES
gulp.task('watch', function() {

  console.log('Running gulp task "WATCH"');

  // LIVE RELOAD
  if ( app.config.liveReload.use === true ) {

    // CSS
    gulp.watch(paths.css).on('change', function(file) {
      server.changed(file.path);
    });

    // IMG
    gulp.watch(paths.img).on('change', function(file) {
      server.changed(file.path);
    });

    // JS
    gulp.watch(paths.js).on('change', function(file) {
      server.changed(file.path);
    });


    // JADE
    if ( app.config.engines.html === 'jade' ) {
      gulp.watch(paths.views + '.jade').on('change', function(file) { server.changed(file.path); });
    }

    // EJS
    if ( app.config.engines.html === 'ejs' ) {
      gulp.watch(paths.views + '.ejs').on('change', function(file) { server.changed(file.path); });
    }

    // HANDLEBARS
    if ( app.config.engines.html === 'hbs' ) {
      gulp.watch(paths.views + '.hbs').on('change', function(file) { server.changed(file.path); });
    }

    // HOGAN
    if ( app.config.engines.html === 'hogan' || app.config.engines.html === 'mustache' ) {
      gulp.watch(paths.views + '.mustache').on('change', function(file) { server.changed(file.path); });
    }

  }

}); // END: WATCH




// Get and render all .styl files recursively
gulp.task('css', function () {

    console.log('Running gulp task "CSS"');

    // SASS
    if ( app.config.engines.css === 'sass' ) {
      console.log('Compiling Sass');
      gulp.src('./public/css/*.scss')
          .pipe(sass({errLogToConsole: true}))
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



}); // END: CSS TASK




// BUILD TASK TO RENDER TEMPLATES TO HTML + COPY & MINIFY ASSETS
// THIS BIT IS STILL IN BETA. USE AT YOUR OWN RISK!
gulp.task('build', function () {

  console.log('Running gulp task "HTML"');

  var siteData = {
    site : {
      name : app.site.name,
      dir : {
        css : '../public/css/',
        js : '../public/js/',
        img : '../public/img/',
        lib : '../public/lib/'
      }
    }
  };

  // PROCESS HTML TEMPLATES
  if ( app.config.engines.html === 'jade' ) {

    console.log( 'Building HTML from: ' + paths.views + '.jade');
    gulp.src( paths.views + '.jade' )
      .pipe(jade({
        locals: siteData
      }))
      .pipe(gulp.dest( paths.build ));

  }

  // MINIFY JS
  console.log( 'Minify JS from: ' +  paths.js[0] + '.js');
  gulp.src( paths.js[0] + '.js' )
    .pipe(gulp.dest( paths.build + 'public/js/' ));

  // MINIFY CSS
  console.log( 'Minify CSS from: ' +  paths.css + '.css');
  gulp.src( paths.css )
    .pipe(uglify({outSourceMap: true}))
    .pipe(gulp.dest( paths.build + 'public/css/' ));

  // COPY LIB FILES
  console.log( 'Copy lib files from: ' +  paths.lib );
  gulp.src( paths.lib )
    .pipe(gulp.dest( paths.build + 'public/lib/' ))
    .pipe( exit() );

  // COPY IMAGES
  console.log( 'Copy images from: ' +  paths.img );
  gulp.src( paths.img )
    .pipe(gulp.dest( paths.build + 'public/img/' ))
    .pipe( exit() );

}); // END: BUILD TASK




// RELOAD BROWSER ON CHANGE
gulp.task('reload', function () {

  if ( app.config.liveReload.use === true ) {
    livereload();
  }

}); //END: RELOAD TASK




// MONITOR SERVER FOR CHANGES & RESTART
gulp.task('nodemon', function() {

  console.log('Running gulp task "NODEMON"');

  nodemon({
    script: paths.app,
    ext: 'js, ejs, hbs, jade, html, mustache, styl, less, scss',
    ignore: ['README.md', 'node_modules/**', '.DS_Store']
  })
  .on('change', ['css'])
  .on('restart', ['reload']);

}); // END: NODEMON TASK
