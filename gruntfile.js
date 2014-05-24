// THE GRUNT FILE HAS BEEN DEPRECATED . I'M LEAVING IT IN AS A STARTER FILE
// IF YOU PREFER TO USE GRUNT FOR YOUR PROJECT. BUT ONLY THE GULP WORKFLOW
// WILL BE OFFICIALLY SUPPORTED/UPDATED GOING FORWARD.

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            views: {
                files: ['app/views/**'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['public/js/**', 'app/**/*.js'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/css/**'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
          dev: {
            script: 'server.js',
            args: [],
            ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
            watchedExtensions: ['js', 'hbs', 'jade', 'html', 'mustache'],
            watchedFolders: ['app', 'config', 'tesla_modules'],
            debug: true,
            cwd: __dirname
          }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');

    //Default task(s).
    grunt.registerTask('default', ['concurrent']);

};
