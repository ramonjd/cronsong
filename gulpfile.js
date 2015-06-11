
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var path = require('path');
var babel = require("gulp-babel");

//https://gist.github.com/mikaelbr/8425025
//https://babeljs.io/docs/setup/#gulp
gulp.task('babel', function () {
  return gulp.src('src/**/*.es6')
    .pipe(babel())
    .pipe(gulp.dest('app'));
});


gulp.task('build', function () {
  
  var stream = browserify({
    entries: './src/public/app/app.jsx',
    extensions: ['.jsx'],
    debug: true,
    transform: [babelify],
    fullPaths: false
  });

  return stream.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/public/js/'));
});


gulp.task('styles', function() {
    gulp.src(['./src/public/less/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest('./app/public/css'));
});

gulp.task('copy-html', function() {
    gulp.src('./src/public/index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./app/public'));
});

gulp.task('default', ['styles', 'babel', 'build', 'copy-html']);