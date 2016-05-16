var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var destPath = 'js/';


/**
 * COMPRESSION
 */
gulp.task('compress', function() {
  return gulp.src(['js/*.js'])
    .pipe(gulp.dest(destPath))
    .pipe(rename('dist.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destPath))
});

gulp.task('watch', function() {
    gulp.watch(
      ['js/*.js'],
      ['compress']
    );
});