var gulp = require('gulp');
var less = require('gulp-less');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var argv = require('yargs').argv;

/**
 * Runs build tasks on file changes
 */
gulp.task('watch', function() {
    gulp.watch('heimdall/static/js/**/*.js', ['js']);
    gulp.watch('heimdall/static/css/**/*.less', ['css']);
});

/**
 * Compile and build the JS files
 */
gulp.task('js', function() {
    return gulp.src('heimdall/static/js/app.js')
        .pipe(browserify({debug: !argv.production}))
        .pipe(concat('app-build.js'))
        .pipe(gulp.dest('heimdall/static/build/js'));
});

/**
 * Compile LESS files to css and prefix it
 */
gulp.task('css', function() {
    return gulp.src('heimdall/static/css/app.less')
        .pipe(less())
        .pipe(gulp.dest('heimdall/static/build/css'));
});
