var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

/**
 * Runs build tasks on file changes
 */
gulp.task('watch', function() {
    gulp.watch('heimdall/static/js/**/*.js', ['js']);
});

/**
 * Compile and build the JS files
 */
gulp.task('js', function() {
    gulp.src('heimdall/static/js/app.js')
        .pipe(browserify())
        .pipe(concat('app-build.js'))
        .pipe(gulp.dest('heimdall/static/build/js'));
});
