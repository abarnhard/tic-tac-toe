"use strict";

var gulp      = require('gulp');
var less      = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename    = require('gulp-rename');
var jade      = require('gulp-jade');
var jshint    = require('gulp-jshint');
var jscs      = require('gulp-jscs');

var paths = {
  less:   ['./app/**/*.less'],
  jade:   ['./app/**/*.jade'],
  code:   ['./app/**/*.js'],
  assets: ['./app/assets/**/*']
};

gulp.task('default', ['less', 'jade', 'lint', 'jscs', 'copy-code', 'copy-assets', 'watch']);

gulp.task('less', function(done) {
  gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest('./public'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./public'))
    .on('end', done);
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade({pretty: true, doctype: 'html'}))
    .pipe(gulp.dest('./public'));
});

gulp.task('lint', function() {
  return gulp.src(paths.code)
           .pipe(jshint())
           .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
  return gulp.src(paths.code)
           .pipe(jscs());
});

gulp.task('copy-code', function() {
  return gulp.src(paths.code).pipe(gulp.dest('./public'));
});

gulp.task('copy-assets', function() {
  return gulp.src(paths.assets).pipe(gulp.dest('./public/assets'));
});

gulp.task('watch', function() {
  gulp.watch(paths.less,   ['less']);
  gulp.watch(paths.jade,   ['jade']);
  gulp.watch(paths.code,   ['lint']);
  gulp.watch(paths.code,   ['jscs']);
  gulp.watch(paths.code,   ['copy-code']);
  gulp.watch(paths.assets, ['copy-assets']);
});

