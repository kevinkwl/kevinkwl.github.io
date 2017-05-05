var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var base64 = require('gulp-base64');

var less = require('gulp-less');
var path = require('path');

var gulp = require('gulp');
var data = require('gulp-data');
var stylus = require('gulp-stylus');

var paths = {
  css : {
    src : './_styl/style.styl',
    dest: './static/assets/css'
  }
};


gulp.task('watch', function() {
    gulp.watch('./_styl/**/*.styl', ['one']);  // Watch all the .less files, then run the less task
});

gulp.task('default', ['watch']); // Default will run the 'entry' watch task


gulp.task('one', function () {
  return gulp.src(paths.css.src)
    .pipe(stylus())
    .pipe(gulp.dest(paths.css.dest));
});
