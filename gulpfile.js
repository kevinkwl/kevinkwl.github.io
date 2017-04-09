var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var base64 = require('gulp-base64');

var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./_less/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./static/assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('./_less/*.less', ['less']);  // Watch all the .less files, then run the less task
});

gulp.task('default', ['watch']); // Default will run the 'entry' watch task


// MAIN DEPLOYMENT TASK RUNNER //

gulp.task('minify', function() {
  return gulp.src([
    './_output/hugo-stage-1/**/*.html',
    '!./_output/hugo-stage-1/page/**/*.html',
    '!./_output/hugo-stage-1/blog/dummy/**/*.html'
  ])
  .pipe(htmlmin({
    collapseWhitespace: true,
    conservativeCollapse: false,
    minifyCSS: true,
    minifyJS: true,
    sortAttributes: true,
    sortClassName: true,
    minifyURLs: true
  }))
  .pipe(gulp.dest('./_output/hugo-stage-2/'))
});

gulp.task('copy1', function() {
  return gulp.src([
    './_output/hugo-stage-1/assets/**/*',
    '!./_output/hugo-stage-1/assets/img/t/**/*',
    '!./_output/hugo-stage-1/assets/img/t/',
    '!./_output/hugo-stage-1/assets/js/fullPage.js',
    '!./_output/hugo-stage-1/assets/js/bootstrap-nojquery.js'
  ])
  .pipe(gulp.dest('./public/assets'))
});

gulp.task('copy2', function() {
  return gulp.src([
    './_output/hugo-stage-1/**/*.xml',
    './_output/hugo-stage-1/**/*.txt',
    './_output/hugo-stage-1/readme.md'
  ])
  .pipe(gulp.dest('./public/'))
});

gulp.task('base64', ['minify'], function () {
  return gulp.src([
    './_output/hugo-stage-2/**/*.html'
  ])
  .pipe(base64({
    baseDir: './_output/hugo-stage-1/',
    extensions: ['jpg'],
    maxImageSize: 20 * 1024 // bytes
  }))
  .pipe(gulp.dest('./public/'));
});

gulp.task('deploy', ['minify', 'copy1', 'copy2', 'base64']);
